import './index.scss'

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
import modal from 'react-modal';
import React, { useEffect, useState } from 'react'
import { criarPlaylist, criarPlaylistItem, DeletaPlaylist, listarPlaylistPorIdUsuarioo, listaPlaylist, listarPlaylistItemUsuarioo, listarPlaylistImagem } from '../../api/playlistAPI';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import Storage from 'local-storage'
import { buscarUsuarioPorId } from '../../api/usuarioAPI';
import Modal from 'react-modal';
import { enviarArquivoMusica, listarCurtidas } from '../../api/musicaAPI';
import { API_URL } from '../../api/config';
import styled from 'styled-components';
import { seguindoArtistaPorId } from '../../api/cadastroArtistaAPI';
import Cabecario from '../../components/cabeçalho';


const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    
    transform: 'translate(-50%, -50%)',
  },
};



export default function Index() {

  const button = styled.button({
    backgroundColor: 'grey',
  });

  const [nome, setNome] = useState('')
  const [musica, setMusica] = useState([])
  const [usu, setUsu] = useState([])
  const [artista, setArtista] = useState([])
  const [itemm, setItemm] = useState([])
  const [imagem, setImagem] = useState([])
  const [id, setId] = useState(0)
  const navigate = useNavigate()
  const {idParam} = useParams()


  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
     //references are now sync'd and can be accessed.
     subtitle.style.color = '#8D32E5';
    //  subtitle.style.backgroundColor = '#8D32E5';
    //  subtitle.style.outline = 'none';
    //  subtitle.style.border = 'solid 2px #000';
    //  subtitle.style.borderRadius = '15px';
    //  subtitle.style.height = '30px';
    //  subtitle.style.width = '70px';

    //  subtitlee.style.color = '#fff';
    //  subtitlee.style.backgroundColor = '#8D32E5';
    //  subtitlee.style.outline = 'none';
    //  subtitlee.style.border = 'solid 2px #000';
    //  subtitlee.style.borderRadius = '15px';
    //  subtitlee.style.height = '30px';
    //  subtitlee.style.width = '70px';
     
    
  }

  function closeModal() {
   
    setIsOpen(false);
  }


  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 2
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1
    }
  };

  useEffect(() => {
    if(!Storage('usuario-logado')){
      navigate('/LoginUsuario');
  }
    carregarPlaylist();
    carregarCurtida();
    carregarSeguidores();
    carregarMusica()
    carregarImagem()

  }, [])

  function acessarPlaylist(id) {
    const idPlaylist = ({
      "id":id
  })
    Storage('foi', idPlaylist)
    navigate(`/ReproduzirPlaylist/${id}`)

  }

  async function carregarSeguidores() {
    const id = Storage('usuario-logado').id
    const resp = await seguindoArtistaPorId(id)
    console.log(resp)
    setArtista(resp)

  }

  async function carregarMusica() {
    const id = Storage('usuario-logado').id
    const x = await listarPlaylistItemUsuarioo(id)
    setItemm(x)
    console.log(x)
  }


  async function carregarPlaylist() {
    const id = Storage('usuario-logado').id;
    const resp = await listarPlaylistPorIdUsuarioo(id)

    setUsu(resp)
  }

  async function carregarImagem() {
    const id = Storage('usuario-logado').id;
    const resp = await listarPlaylistImagem(id)
    setImagem(resp)

  }

  async function carregarCurtida() {
    const id = Storage('usuario-logado').id;
    const resp = await listarCurtidas(id)
    setMusica(resp)
  }

  async function DeletarPlaylist(id) {

    confirmAlert({
      title: 'Remover playlist',
      message: `deseja remover a playlist ${id}?`,
      buttons: [
        {
          label: 'sim',
          onClick: async () => {
            const filtro = await DeletaPlaylist(id)


            if (filtro === '') {
              carregarPlaylist();
            }
            else
              carregarPlaylist()
            toast.dark('Playlist removida')
          }
        },
        {
          label: 'Não'
        }
      ]
    })

  }

  function acessarArtista(id){

    navigate(`/detalhe/artista/${id}`)
  }

  function acessarMusicaa(id){
    navigate(`/play/${id}` )
  }



  async function salvarClick() {
    try {

      let id = Storage('usuario-logado').id;

      const NovaPlaylist = await criarPlaylist(nome, id);
      Storage('Playlist', NovaPlaylist)

      navigate('/AdicionarMusica')
      toast.dark('Playlist criada');

    }

    catch (err) {
      if (err.response)
        toast.error(err.response.data.erro)
      else
        toast.error(err.message);
    }
  }



  return (
    <main className="pag-playlist">
      <Cabecario/>

      <ToastContainer />
      <section className='section-musicas'>
        <h2 className='titulos'>Musicas</h2>

        <Carousel
          swipeable={false}
          draggable={false}
          responsive={responsive}
          ssr={true}
          infinite={true}
          autoPlaySpeed={1000}
          keyBoardControl={true}
          transitionDuration={500}

        >

          {musica.map(item =>
            <div className='music' onClick={() => acessarMusicaa (item.IdMusica) }>
              <img className='caixa-musica' src={`${API_URL}/${item.imagem}`} alt="" />
              <div className='textt'>
                <h3>{item.musica}</h3>
                <p>Teto</p>
              </div>
            </div>
          )}

        </Carousel>
      </section>

      <section className='section-musicas'>
        <h2 className='titulos'>Artistas - Seguidos</h2>
        <Carousel
          swipeable={false}
          draggable={false}
          responsive={responsive}
          ssr={true}
          infinite={true}
          autoPlaySpeed={1000}
          keyBoardControl={true}
          transitionDuration={500}
          centerMode
        >
          {artista.map(item =>
            <div className='music' onClick={ () => acessarArtista (item.IdArtista) }>

              <div className='caixa-musica'>
                <img className='caixa-musica' src={`${API_URL}/${item.imagem}`} alt="" />
              </div>
              <div className='textt'>
                <h3>{item.artista}</h3>
              </div>


            </div>
          )}
        </Carousel>
      </section>



      <Carousel
        swipeable={false}
        draggable={false}
        responsive={responsive}
        ssr={true}
        infinite={true}
        autoPlaySpeed={1000}
        keyBoardControl={true}
        transitionDuration={500}
        centerMode
      >
        {usu.map(item =>

          <section className='section-playlist' >

          <h1>Playlist de {item.usuario}</h1>

            

            <div className="acoes"><img src='/images/excluir.png' onClick={() => DeletarPlaylist(item.id, item.usu)} /></div>
            <h2 className='titulo-playlist'>{item.nome}</h2>

            <div className='playlist' onClick={() => acessarPlaylist(item.id)}>

              {imagem.map((item) =>

                <img className='capP' src={`${API_URL}/${item.imagem}`} alt="" />

              )}


              <div className='nome-playlist'>
                <h1>{item.nome}</h1>
                <h1>{usu.id}</h1>
              </div>

            </div>

          </section>
        )}
      </Carousel>
      <section className='faixa-criar-play'>

        <div onClick={openModal} className='caixa-musica-playlist'>
          <img className='k' src="/images/add.png" alt="" />

        </div>
        <h1 className='criar-playlist'>Criar Playlist</h1>

      </section>
      <div className='finalização'></div>



      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <button className='botaoModal' ref={(_subtitle) => (subtitle = _subtitle)} onClick={closeModal}>Fechar</button>
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Criar Playlist</h2>
      
        <br />



        <input type='text' value={nome}  onChange={e => setNome(e.target.value)} />
        

        <button className='botaoModal'   onClick={salvarClick} >Continuar</button>


      </Modal>

    </main>
  )
}