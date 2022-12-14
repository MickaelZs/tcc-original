import { con } from "./connection.js";

export async function cadastrorArtista(artistas){
    const comando = `insert into tb_artistas(id_genero,nm_artistas, ds_sobre)
                    values(?, ?, ?);`

    const [resposta] = await con.query(comando,[artistas.genero,artistas.artistas,artistas.sobre]);
    artistas.id = resposta.insertId;

    return artistas;
}

export async function alterarImagem(imagem, id){
    const comando = `UPDATE tb_artistas
                    SET img_artista = ?
                    WHERE id_artistas = ?`;

    const [resposta] = await con.query(comando,[imagem, id]);
    return resposta.affectedRows;
}


export async function listarTodosArtista() {
    const comando =
    `select tb_artistas.id_artistas id,
    nm_artistas nome,
    ds_sobre sobre,
    nm_genero genero,
    img_artista artista
    from tb_artistas
    inner join tb_genero on tb_artistas.id_genero = tb_genero.id_genero;`
    
    const [linhas] = await con.query(comando);
    return linhas;
}

export async function listarArtistaPorGenero(id) {
    const comando =
    ` select 
    id_artistas id,
    id_genero genero,
    nm_artistas nome,
    ds_sobre sobre,
    img_artista artista
    from tb_artistas
    where id_genero = ?`
    
    const [linhas] = await con.query(comando, [id]);
    return linhas;
}

export async function buscarImagem() {
    const comando =
    `select
    img_artista artista
    from tb_artistas;`
    
    const [linhas] = await con.query(comando);
    return linhas;
}


export async function buscarPorId(id) {
    const comando =

    `select tb_artistas.id_artistas id,
    nm_artistas nome,
    ds_sobre sobre,
    nm_genero genero,
    img_artista artista
    from tb_artistas
    inner join tb_genero on tb_artistas.id_genero = tb_genero.id_genero
    where id_artistas = ?`

    const [linhas] = await con.query(comando, [id]);
    return linhas[0];
}

export async function ListaPorId(id) {
    const comando =

    `select 
    id_artistas id,
    id_genero genero,
    nm_artistas nome,
    ds_sobre sobre,
    img_artista artista
    from tb_artistas
    where id_artistas = ?`

    const [linhas] = await con.query(comando, [id]);
    return linhas[0];
}


export async function deletaArtista (id){
    const comando = 
    `delete from tb_artistas
    where id_artistas = ? `;
    const [resposta] = await con.query(comando, [id]);
    return resposta.affectedRows;
}

export  async function alteraArtista(id, artista){
    const comando = 
        `update tb_artistas
        set	id_genero  = ?,
            nm_artistas	= ?,
            ds_sobre	= ?
        where id_artistas = ?`
const [resposta] = await con.query(comando,[artista.genero,artista.nome,artista.sobre,id ])
return resposta.affectedRows;
}

export async function buscarPorNome(nome) {
    
    const comando =
    `select tb_artistas.id_artistas id,
    nm_artistas     nome,
    nm_genero genero,
    tb_genero.id_genero      iDgenero,
    ds_sobre    sobre,
    img_artista     artista
    from tb_artistas
    inner join tb_genero on tb_artistas.id_genero = tb_genero.id_genero
    where nm_artistas like ?`;
    
    const [linhas] = await con.query(comando, [`%${nome}%`]);
    return linhas;
}

export async function seguirArtista(idUsuario,artista){
    const comando = `insert into tb_usuario_artista_seguido(id_usuario, id_artistas)
                    values(?, ?);`

    const [resposta] = await con.query(comando,[idUsuario,artista.artista]);
    artista.id = resposta.insertId;

    return artista;
}

export async function artistaSeguidosPorId(id) {
    const comando =

    `select tb_usuario_artista_seguido.id_usuario_artista_seguido,
    id_usuario id,
    tb_artistas.id_artistas IdArtista,
    nm_artistas artista,
    img_artista imagem
    from tb_usuario_artista_seguido
    inner join tb_artistas on tb_usuario_artista_seguido.id_artistas = tb_artistas.id_artistas
    where id_usuario = ?;`

    const [linhas] = await con.query(comando, [id]);
    return linhas;
}

    
export async function ParaDeSeguir (idUsuario, idArtista){
    const comando = 
    `delete from tb_usuario_artista_seguido
    where id_usuario = ? AND id_artistas = ? `;
    const [resposta] = await con.query(comando, [idUsuario, idArtista]);
    return resposta.affectedRows;
}