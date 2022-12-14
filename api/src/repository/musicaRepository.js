import { con } from "./connection.js";

export async function buscarMusicaPorNome(nome) {
    
    const comando =
    `select id_musica,
    tb_genero.id_genero idGenero,
    nm_genero genero,
    tb_artistas.id_artistas idArtista,
    nm_artistas artista,
    nm_musicas musica,
    blob_musica audio,
    img_imagem imagem
    from tb_musicas
    inner join tb_genero on tb_musicas.id_genero = tb_genero.id_genero
     inner join tb_artistas on tb_musicas.id_artistas = tb_artistas.id_artistas
    where nm_musicas like ?;
    
   `;
    
    const [linhas] = await con.query(comando, [`%${nome}%`]);
    return linhas;
}


export async function cadastrarMusica(musica){
    const comando = `insert into tb_musicas (id_genero, id_artistas, nm_musicas)
    values (?,?,?)`

    const [resposta] = await con.query(comando,[musica.genero,musica.artistas,musica.nome]);
    musica.id = resposta.insertId;

    return musica;
}



export async function alterarImagemMusica(imagem, id){
    const comando = `
    update tb_musicas 
    set img_imagem = ?
    where id_musica = ?;`

    const [resposta] = await con.query(comando,[imagem, id]);
    return resposta.affectedRows;
}

export async function deletaMusica (id){
    const comando = 
    `delete from tb_musicas
    where id_musica = ? `;
    const [resposta] = await con.query(comando, [id]);
    return resposta.affectedRows;
}

export async function deletarPlaylistItem(id){
    const comando = 
    `delete from tb_playlist_item
    where id_musica = ? `;
    const [resposta] = await con.query(comando, [id]);
    return resposta.affectedRows;
}

export async function deletarUsuarioMusicaFavorita(id){
    const comando = 
    `delete from tb_usuario_musica_favorita
    where id_musica = ? `;
    const [resposta] = await con.query(comando, [id]);
    return resposta.affectedRows;
}


export async function listarMusicaeArtista() {
    const comando =
    `select tb_musicas.id_musica,
    nm_artistas artista,
    nm_genero  genero,
    nm_musicas musica,
    blob_musica audio,
    img_imagem imagem,
    img_imagem capaArtista
    from tb_musicas
    inner join tb_artistas on tb_musicas.id_artistas = tb_artistas.id_artistas
    inner join tb_genero on tb_musicas.id_genero = tb_genero.id_genero;`
    
    const [linhas] = await con.query(comando);
    return linhas;
}



export async function listarMusicaPorId(id) {
    const comando =
    `select id_musica id,
    tb_genero.id_genero idGenero,
    nm_genero genero,
    tb_artistas.id_artistas idArtista,
    nm_artistas artista,
    nm_musicas nome,
    blob_musica musica,
    img_imagem imagem
    from tb_musicas
    inner join tb_genero on tb_musicas.id_genero = tb_genero.id_genero
     inner join tb_artistas on tb_musicas.id_artistas = tb_artistas.id_artistas
    where id_musica = ? ;`
    
    const [linhas] = await con.query(comando, [id]);
    return linhas;
}

export async function listarArtistaPorMusica(id) {
    const comando =
    `select 
    id_musica id,
    nm_genero genero,
    id_artistas idArtista,
    nm_musicas nome,
    blob_musica audio,
    img_imagem imagem
    from tb_musicas
    inner join tb_genero on tb_musicas.id_genero = tb_genero.id_genero
    where id_artistas = ?`
    
    const [linhas] = await con.query(comando, [id]);
    return linhas;
}

export async function listarMusicaPorGenero(id) {
    const comando =
    ` select 
    id_musica id,
    tb_genero.id_genero idGenero,
    nm_genero genero,
    id_artistas idArtista,
    nm_musicas nome,
    blob_musica audio,
    img_imagem imagem
    from tb_musicas
    inner join tb_genero on tb_musicas.id_genero = tb_genero.id_genero
    where tb_genero.id_genero = ? ;`
    
    const [linhas] = await con.query(comando, [id]);
    return linhas;
}

export  async function alteraMusica(id, musica){
    const comando = 
        `update tb_musicas
        set	id_genero  = ?,
            id_artistas	= ?,
            nm_musicas	= ?
        where id_musica = ?`
const [resposta] = await con.query(comando,[musica.genero,musica.artista,musica.nome,id ])
return resposta.affectedRows;
}

export async function MusicaFavorita(idUsuario,musica){
    const comando = `insert into tb_usuario_musica_favorita (id_usuario,id_musica)
    values (?,?);`

    const [resposta] = await con.query(comando,[idUsuario,musica.musica]);
    musica.id = resposta.insertId;

    return musica;
}

export async function listarcurtidaPorIdUsuario(idUsuario) {
    const comando =
    `select tb_usuario_musica_favorita.id_usuario_musica_favorita,
    id_usuario usuario,
    tb_musicas.id_musica IdMusica,
    nm_musicas musica,
    id_genero genero,
    id_artistas artista,
    blob_musica audio,
    img_imagem imagem
    from tb_usuario_musica_favorita
    inner join tb_musicas on tb_usuario_musica_favorita.id_musica = tb_musicas.id_musica
    where id_usuario = ?
    ;`
    
    const [linhas] = await con.query(comando, [idUsuario]);
    return linhas;
}


export async function deletaCurtida (idUsuario, idMusica){
    const comando = 
    `delete from tb_usuario_musica_favorita 
    where id_usuario = ? AND id_musica = ? `;
    const [resposta] = await con.query(comando, [idUsuario, idMusica]);
    return resposta.affectedRows;
}




