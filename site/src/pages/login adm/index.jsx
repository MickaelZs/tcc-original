import './index.scss'

import axios from 'axios';
import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../api/loginadmAPI';
import storage from 'local-storage'

export default function Index() {

  const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState('');
    const navigate = useNavigate();
  
  async function loginClick() {

    try{
        const r = await login(email,senha)
        storage('adm-logado', r)
      navigate('/adm/cadastrarArtista');
    }

    catch(err){
      if(err.response.status === 401){
          setErro(err.response.data.erro)
      }

  }
}

    return (
      <div className="pagina-loginADM">
       
      
        
        <section className='faixa2'>
        <div class="label-float">
        <input type="text" placeholder="Email" value={email}  onChange={e => setEmail(e.target.value)}/> 
       
          </div>
          <br/>
          <div class="label-float">
            <input type="text" placeholder="Senha" required  value={senha} onChange={e => setSenha(e.target.value)} />
         
          </div>
          <button type='button' className='botao'  onClick={loginClick}> Entrar </button>
          </section>

          <div>
            {erro}
          </div>
      </div>
    );
  }