import './index.scss'
import CardAudio from '../../components/CardAudio'
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { buscarArtistaPorMusicaId, buscarMusicaPorId } from '../../api/musicaAPI';
import { useEffect } from 'react';
import { API_URL } from '../../api/config';
import { listarPlaylistItemUsuarioo } from '../../api/playlistAPI';
import Storage from 'local-storage'

export default function Reproduzir() {
    const [musica, setMusica] = useState([])
    const [imagemPrincipal, setImagemPrincipal] = useState();
    const [musicaPrincipal, setMusicaPrincipal] = useState('');
    const [generoPrincipal, setGeneroPrincipal] = useState('');
    const [audioPrincipal, setAudioPrincipal] = useState(0)
    const navigate = useNavigate()
    const { idParam } = useParams()

    function acessarMusica(id) {
        navigate(`/Reproduzir/${id}`)
    }

    function exibirImagemPrincipal(imagem) {
        if (musica.imagem > 0) {
            console.log(imagem)
            return API_URL + '/' + imagem[imagemPrincipal];
        }

        else {
            return '/images/teto.jpg';

        }


    }

    function exibirImagemProduto(imagem) {
        return API_URL + '/' + imagem;
    }

    function exibirAudio(audio) {
        return API_URL + '/' + audio;
    }



    async function carregarMusica() {

        const x = await buscarArtistaPorMusicaId(idParam)

        setMusica(x)
        console.log(x)

    }

    useEffect(() => {
        carregarMusica()

    }, [])


    return (
        <main className='pagina-reproduzir-musica'>
            <section className='faixa-principal'>

                <div className='faixa-1'>
                    {!imagemPrincipal &&
                        <img className='usuarioo' src='/images/musica.png' />
                    }

                    {imagemPrincipal &&
                        <img src={imagemPrincipal} alt="" />
                    }
                    <audio autoPlay={true} src={audioPrincipal}></audio>
                    <div className='text'></div>
                    <h1>{musicaPrincipal}</h1>
                    <h3>{generoPrincipal}</h3>
                </div>

                <div >

                    {musica.map((item, pos) =>

                        <div className='cardmusica'>
                            
                            <img src={exibirImagemProduto(item.imagem)} onClick={() => setImagemPrincipal(exibirImagemProduto(item.imagem)) & setAudioPrincipal(exibirAudio(item.audio)) & setMusicaPrincipal(item.nome) & setGeneroPrincipal(item.genero)} className="image-music" />

                            <div className='div-ator'>
                                <h1>{item.nome}</h1>
                                <p>{item.genero}</p>

                            </div>
                            <img src="/images/heart on.png" alt="" />

                        </div>
                    )}


                </div>

            </section>
        </main>
    );
}