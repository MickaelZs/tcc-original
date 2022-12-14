import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/home';
import LoginAdm from './pages/login adm';
import CadastroUsuario from './pages/cadastro usuario';
import LoginUsuario from './pages/login usuario'
import Confirmacao from './pages/confirmacao'
import Rec from './pages/recuperacao';
import PlayMusic from './pages/play music';
import Cadastromsc from './pages/cadastrarmsc';
import Cadartista from './pages/cadastrarArtista';
import MusicaCadastradas from './pages/musica cadastrada';
import ArtistaCadastrados from './pages/artista cadastrado';
import HomeLoginFeito from './pages/home login feito';
import Genero from './pages/pagina generos';
import Consulta from './pages/consultar';
import Reproduzir from './pages/ReproduzirMusica';
import Buscar from './pages/buscar';
import InfoUsario from './pages/informacao usuario';
import DetalheAertista from './pages/detalheAertista';
import Playlist from './pages/playlist';
import AdicionarMusica from './pages/adicionarMusica'
import Teest from './pages/TESTCARD';
import ReproduzirPlaylist  from './pages/reproduzirPlaylist'
import AddMusicPlaylist from './pages/addMusicPlaylist'

import Play from './pages/Play';
import Test from './pages/TESTCARD';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/loginAdm' element={<LoginAdm/>}/>
      <Route path='/adm/cadastrarArtista' element={<Cadartista/>}/>

      <Route path='/adm/cadastrarArtista/alterar/:idParam' element={<Cadartista/>}/>
      <Route path='/adm/cadastromusica' element={<Cadastromsc/>}/>
      <Route path='/adm/cadastromusica/alterar/:idParam' element={<Cadastromsc/>}/>

      <Route path='/adm/musicaCadastradas' element={<MusicaCadastradas/>}/>
      <Route path='/adm/artistaCadastrados' element={<ArtistaCadastrados/>}/>
      <Route path='/cadastroUsuario' element={<CadastroUsuario/>}/>

      <Route path='/loginUsuario' element={<LoginUsuario/>}/>
      <Route path='/confirmacao' element={<Confirmacao/>}/>
      <Route path='/Rec' element={<Rec/>}/>

      <Route path='/PlayMusic' element={<PlayMusic/>}/>
      <Route path='/HomeLoginFeito' element={<HomeLoginFeito/>}/>
      <Route path='/genero' element={<Genero/>}/>

      <Route path='/genero/:idParam' element={<Genero/>}/>
      <Route path='/Consulta' element={<Consulta/>}/>
      <Route path='/detalhe/artista/:idParam' element={<DetalheAertista/>}/>

      <Route path='/Reproduzir' element={<Reproduzir/>}/>
      <Route path='/Reproduzir/:idParam' element={<Reproduzir/>}/>
      <Route path='/ReproduzirPlaylist/:idParam' element={<ReproduzirPlaylist/>}/>

      <Route path='/ReproduzirPlaylist' element={<ReproduzirPlaylist/>}/>
      <Route path='/buscar' element={<Buscar/>}/>
      <Route path='/informacao' element={<InfoUsario/>}/>

      <Route path='/informacao/:idParam' element={<InfoUsario/>}/>
      <Route path='/Playlist' element={<Playlist/>}/>
      <Route path='/adicionarMusica' element={<AdicionarMusica/>}/>

      <Route path='/adicionarMusica/:idParam' element={<AdicionarMusica/>}/>
      <Route path='/adicionarMusicaPlaylist/:idParam' element={<AddMusicPlaylist/>}/>
      <Route path='/test' element={<Teest/>}/>
      <Route path='/Play' element={<Play/>}/>
      
      <Route path='/Play/:idParam' element={<Play/>}/>
      
    </Routes>
    </BrowserRouter>
  </React.StrictMode>
);


