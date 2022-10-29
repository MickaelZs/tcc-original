import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { buscarPorId, seguirArtista } from "../../api/cadastroArtistaAPI"
import { ToastContainer, toast } from 'react-toastify';
import { buscarArtistaPorMusicaId, curtirMusica, deletarrCurtida, listaMusicaArtista, listarCurtidas } from "../../api/musicaAPI"
import { API_URL } from "../../api/config"
import './index.scss'


import Storage from 'local-storage'



export default function Index() {

    const [artista, setArtista] = useState([])
    const [musica, setMusica] = useState([])
    const [curtir, setCurtir] = useState(false)
    const [heart, setHeart] = useState('')
    const { idParam } = useParams()
    const navigate = useNavigate()
    console.log(artista)

    async function deletarClick(id) {
        try {
            const resp = await deletarrCurtida(id)
            toast.dark('curtida deletada')
        }
        catch (err) {
            if (err.response) toast.error(err.response.data.erro);
            else toast.error(err.message);

        }
    }


    function acessarMusica(id) {
        navigate(`/play/${id}`)
    }

    function mostrarImagem(imagem){
        
        if (typeof (imagem) == 'object') {
            return URL.createObjectURL(imagem);
        }
        else {
                
                return `${API_URL}/${imagem}`
        }
    }
    function escolherImagem(objeto, mostrarNovaimagem) {
        document.querySelector(objeto).src="./images/heart on.png";
    }

    








    async function carregarCurtidas() {
        const id = Storage('usuario-logado').id;
        const resp = await listarCurtidas(id)
            (resp)

    }

    async function seguir(position) {
        try {
            let id = Storage('usuario-logado').id;
            let artistas = artista.id
            const resp = await seguirArtista(id, artistas)
            toast.dark('vamosssss')
        }
        catch (err) {
            if (err.response) toast.error(err.response.data.erro);
            else toast.error(err.message);
        }

    }

    async function curtirr(position) {
        try {
            let id = Storage('usuario-logado').id;
            let musicaSelecionada = musica[position].id
            const resp = await curtirMusica(musicaSelecionada, id)

            toast.dark('musica curtidaa');

        }

        catch (err) {
            if (err.response) toast.error(err.response.data.erro);
            else toast.error(err.message);

        }

    }


    async function carregarArtista() {
        const resp = await buscarPorId(idParam)
        setArtista(resp)
        console.log(resp)
    }

    async function carregarArtistaPorMusica() {
        const resp = await buscarArtistaPorMusicaId(idParam)
        setMusica(resp)

    }

    useEffect(() => {
        carregarArtista()
        carregarArtistaPorMusica()
        carregarCurtidas()

    }, [])
    //src={`${API_URL}/${artista.artista}`}


    return (
        <main className='comp-detalhe'>
            <ToastContainer />
            <body>
                <div className="comp-card">
                    <div className='aaaa'>

                        <div className="imagem">
                            <img className="capa" src={`${API_URL}/${artista.artista}`}></img>
                        </div>

                        <div className='box-info'>
                            <p>{artista.id}</p>
                            <h1 className="titulo-artista">{artista.nome}</h1>

                            <div className="genero">
                                <h3 >Genero:</h3>
                                <p className="--genero">{artista.genero}</p>
                            </div>

                            <div className='genero'>
                                <h3>Sobre</h3>
                                <p className='sinopse'>{artista.sobre} </p>
                            </div>
                            <button className='botao' onClick={() => seguir(artista)}>Seguir</button>

                        </div>

                    </div>

                   

{musica.map((item, index) => (
        <div className="Card-addmusica">
        <h2>1.</h2>
        <div className="section-music"> 
        <img src={`${API_URL}/${item.imagem} `} className="imagem" ></img>
        <div className="atorenome">
            <h1>{item.nome}</h1>
            <div className="border">
            <p>{item.genero}</p>
            </div>
        </div>
        </div>
        <div >
       
                                <img src="/images/heart.png" alt=""  onClick={escolherImagem}/>

                                {curtir &&

                                    <img src="/images/heart on.png" alt="" />}

                            </div>
                            <div>

                                <button className="curtida" onClick={() => curtirr(index)} >curtir</button>
                                <button className="curtida" onClick={() => deletarClick(index)} >deletar</button>
                            </div>
    </div>
      ))}


                </div>

            </body>
        </main>
    )
}
