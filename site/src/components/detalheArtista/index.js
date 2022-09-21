
import './index.scss';

export default function DetalheArtista(props) {
    return (
        <div className='comp-detalhe'>
            <img src='https://ingresso-a.akamaihd.net/img/cinema/cartaz/7766-cartaz.jpg' alt='' />
            <div className='box-info'>
                <h1>Artista</h1>
                <div className='info'>
                    <h3>Genero</h3>
                    <p>15/02/2020</p>
                </div>
                <div className='info'>
                    <h3>Sobre</h3>
                    <p className='sinopse'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur rhoncus pulvinar finibus. Etiam et finibus magna. Duis scelerisque hendrerit sem. Nullam cursus lectus at magna iaculis, eget egestas nibh malesuada. Aliquam ipsum magna, pharetra at dictum at, convallis et erat. Sed auctor euismod dolor in varius. Mauris in nunc eget risus tristique tempor. Sed semper euismod arcu, in euismod turpis volutpat non. Curabitur consequat pharetra purus id aliquet. Phasellus sagittis vitae urna quis placerat. Maecenas gravida risus ac vestibulum facilisis.</p>
                </div>
        
            </div>
        </div>
    )
}