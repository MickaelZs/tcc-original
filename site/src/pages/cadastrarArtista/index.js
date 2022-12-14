import { useEffect, useState } from 'react';
import Menu from '../../components/menu'
import './index.scss'

import { ToastContainer, toast } from 'react-toastify';
import { buscarPorId, cadastroArtista, enviarImagemArtista, alterarArtista, listaArtistaPorId } from '../../api/cadastroArtistaAPI'
import { listaGeneros } from '../../api/generoAPI';
import { useNavigate, useParams } from 'react-router-dom'
import Storage from 'local-storage'
import { API_URL } from '../../api/config';

export default function Index() {

    const [nome, setNome] = useState('');
    const [genero, setGenero] = useState([]);
    const [idGenero, setIdGenero] = useState('');
    const [sobre, setSobre] = useState('');
    const [imagem, setImagem] = useState('');
    const [id, setId] = useState(0);
    const [selecionar, setSelecionar] = useState([])


    function adicionarGenero() {
        if (!idGenero) return;

        if (!selecionar.find(item => item == idGenero)) {
            const genero = [...selecionar, idGenero];
            setSelecionar(genero);
        }
    }

    async function carregarGeneros() {
        const r = await listaGeneros();
        setGenero(r);
    }

    const { idParam } = useParams();

    async function carregarGeneros() {
        const r = await listaGeneros();
        setGenero(r);
    }

    useEffect(() => {
        if(!Storage('adm-logado')){
            navigate('/LoginAdm');
        }
        carregarGeneros();
        if (idParam) {
            carregarArtista()
        }
       

    }, [])

    async function carregarArtista() {
        const resposta = await listaArtistaPorId(idParam);
        setId(resposta.id)
        setNome(resposta.nome)
        setIdGenero(resposta.genero)
        setSobre(resposta.sobre)
        setImagem(resposta.artista)

        console.log(resposta)


    }


    function mostrarImagem(imagem) {

        if (typeof (imagem) == 'object') {
            return URL.createObjectURL(imagem);
        }
        else {

            return `${API_URL}/${imagem}`
        }
    }

    function novoClick(){
        setNome('');
        setIdGenero(0);
        setSobre('');
        setImagem();

    }


    const navigate = useNavigate();



    async function salvarClick() {
        try {
            if (!imagem) {
                throw new Error('escolha a imagem do artista');
            }

            if (id === 0) {
                const Novoartista = await cadastroArtista(nome, idGenero, sobre);
                await enviarImagemArtista(Novoartista.id, imagem);
                setId(Novoartista.id)

                toast.dark('Novo artista cadastrado');
            }

            else {
                await alterarArtista(id, nome, idGenero, sobre);
                if (typeof (imagem) == 'object') {
                    await enviarImagemArtista(id, imagem)

                }
                toast.dark(' Artista alterado com sucesso');
            }
        }

        catch (err) {
            if (err.response)
                toast.error(err.response.data.erro)
            else
                toast.error(err.message);
        }
    }


    function escolherImagem() {
        document.getElementById('imagemCapa').click();
    }


    return (
        <main className='pagina-cadastro-artista'>
            <ToastContainer />
            <Menu />
            <section className='faixa-cadastro'>

                <div className='margin-cadastro1'>
                    <div className='div1-cadastro'>
                        <p className='p'>
                            Adicionar capa
                        </p>
                        <div className='border-image' onClick={escolherImagem}>

                            {!imagem &&

                                <img src='/images/image-bottom212.svg' width='120px' />
                            }

                            {imagem &&

                                <img className='border-image' src={mostrarImagem(imagem)} />

                            }

                            <input type='file' id='imagemCapa' onChange={e => setImagem(e.target.files[0])} ></input>
                        </div>
                    </div>
                    <div className='div2-cadastro'>
                        <div>
                        <div className='div-input'>
                            <div className='label-float'>
                                <input type="text" placeholder=" " value={nome} onChange={e => setNome(e.target.value)} />
                                <label>Artista</label>
                            </div>

                            <br />

                            <select value={idGenero} onChange={e => setIdGenero(e.target.value)}>
                                <option selected disabled hidden> Generos </option>
                                {genero.map(item =>
                                    <option value={item.id}> {item.nome} </option>
                                )}
                            </select>
                            <button>+</button>
                            <br />
                            <div className='label-float'>
                                <input type="text" placeholder=" " value={sobre} onChange={e => setSobre(e.target.value)} />
                                <label>Sobre</label>
                            </div>
                            <br />

                        </div>
                        <div className='botoes'>
                            <div>
                                <button className='botao' onClick={salvarClick} >{id === 0 ? 'cadastrar' : 'Alterar'}</button>
                            </div>

                            <div>
                                <button className='botao' onClick={novoClick}>novo</button>
                            </div>                        
                        </div>
                        </div>
                    </div>
                </div>

            </section>
        </main>
    );
}

