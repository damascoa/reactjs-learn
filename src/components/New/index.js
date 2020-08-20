import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'
import './new.css'
class New extends Component {

    constructor(props) {
        super(props);

        this.state = {
            titulo: '',
            imagem: '',
            descricao: ''
        }
        this.cadastrar = this.cadastrar.bind(this);
    }

    cadastrar() {

    }


    render() {
        return (
            <div>
                <header id="new">
                    <Link to="/dashboard">Voltar</Link>
                </header>

                <form onsubmit={this.cadastrar()} id="newPost">
                    <label>Título</label><br />
                    <input type="text" placeholder="Nome do post" value={this.state.titulo}
                        onChange={(e) => this.setState({ titulo: e.target.value })} /> <br />

                    <label>URL Imagem</label><br />
                    <input type="text" placeholder="URL da Imagem" value={this.state.imagem}
                        onChange={(e) => this.setState({ imagem: e.target.value })} /> <br />

                    <label>Descrição</label><br />
                    <textArea type="text" placeholder="Descrição da Postagem" value={this.state.descricao}
                        onChange={(e) => this.setState({ descricao: e.target.value })} /> <br />

                    <button type="submit">Cadastrar</button>


                </form>

            </div>
        )
    }
}

export default withRouter(New)