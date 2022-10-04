import { useEffect, useState } from 'react';
import Menu from '../../components/menu'
import './index.scss'

import { ToastContainer, toast } from 'react-toastify';
import { buscarPorId, cadastroArtista, enviarImagemArtista } from '../../api/cadastroArtistaAPI'
import { listaGeneros } from '../../api/generoAPI';
import { useNavigate, useParams } from 'react-router-dom'
import storage from 'local-storage'

export default function Index(){

    const [nome, setNome] = useState ('');
    const [genero, setGenero] = useState ([]);
    const [idGenero, setIdGenero] = useState ('');
    const [sobre, setSobre] = useState ('');
    const [imagem, setImagem] = useState ('');
    const [id, setId] = useState ('');

    async function carregarGeneros(){
        const r = await listaGeneros();
        setGenero(r);
    }

    const {idParams} = useParams();

    async function carregarGeneros(){
        const r = await listaGeneros();
        setGenero(r);
    }

    useEffect(() => {
        if(!storage('usuario-logado')){
            navigate('/LoginAdm')
        }
        carregarGeneros();
        if (idParams){
        carregarArtista()
        }

    },[] )

    async function carregarArtista (){
        const resposta = await buscarPorId(idParams);
        setNome(resposta.nome)
        setIdGenero(resposta.idGenero)
        setSobre(resposta.sobre)
        setImagem(resposta.imagem)
        setId(resposta.id)
    }

    function mostrarImagem(){
        if(typeof (imagem) == 'object') {
            return  URL.createObjectURL(imagem)
        }
        else {
            return buscarPorId(imagem)
        }
        
    }
   

    const navigate = useNavigate();



    async function salvarClick(){
        try{      
            if (!imagem)
            throw new Error('escolha a imagem do artista');
            const Novoartista = await cadastroArtista (nome,idGenero,sobre);
            const r = await enviarImagemArtista(Novoartista.id, imagem);
            toast.dark('Acho q foi');
            }
        catch (err){
                if(err.response)
                toast.error(err.response.data.erro)
                else
                toast.error(err.message);
            }
        }


        function escolherImagem() {
            document.getElementById('imagemCapa').click();
        }

        function mostrarImagem() {
            return URL.createObjectURL(imagem);
        }
    




    return(
        <main className='pagina-cadastro-artista'>
            <ToastContainer/>
            <Menu />
            <section className='faixa-cadastro'>
                <div className='margin-cadastro'>
                    <div className='div1-cadastro'>
                        <p className='p'>
                            Adicionar capa
                        </p>
                        <div className='border-image' onClick={escolherImagem}>

                            {!imagem &&

                            <img src='/images/image-bottom212.svg' width='170px'/>
                            }

                            {imagem &&  

                            <img className='imagem' src={mostrarImagem()} />

                            }

                            <input type='file' id='imagemCapa' onChange={e => setImagem(e.target.files[0])} ></input>
                        </div>
                    </div>
                    <div className='div2-cadastro'>
                    <div className='div-input'>
                    <div className='label-float'>
                    <input type="text" placeholder=" " value={nome}  onChange={e => setNome(e.target.value)}/>
                    <label>Artista</label>
                    </div>

                    <br />
                        
                        <select value={idGenero} onChange={e => setIdGenero(e.target.value)}>
                        <option selected disabled hidden>Generos</option>

                        {genero.map(item =>
                            <option value={item.id}> {item.nome} </option>
                        )}
                    </select>
                    <br />
                    <div className='label-float'>
                    <input type="text" placeholder=" " value={sobre}  onChange={e => setSobre(e.target.value)}/>
                    <label>Sobre</label>
                    </div>
                    <br />
                       
                        </div>
                        <div className='botoes'>
                                <button className='botao' onClick={salvarClick} >Cadastrar</button>
                               
                                <button className='botao'  >Salvar</button>
                                </div>
                    </div>
                </div>

            </section>
        </main>
    );
}