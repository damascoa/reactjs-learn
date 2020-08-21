import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'
import firebase from '../../firebase'
import './new.css'
class New extends Component {

    constructor(props) {
        super(props);

        this.state = {
            titulo: '',
            imagem: '',
            descricao: '',
            alert: ''
        }
        this.cadastrar = this.cadastrar.bind(this);
    }

    cadastrar = async (e) => {
        console.log('clicou!')
        e.preventDefault();
        if (this.state.titulo.length > 0 && this.state.imagem.length > 0 && this.state.descricao.length > 0) {
            let posts = firebase.app.ref('posts');
            let chave = posts.push().key;
            await posts.child(chave).set({
                titulo: this.state.titulo,
                image: this.state.imagem,
                descricao: this.state.descricao,
                autor: localStorage.nome
            });
            this.props.history.push('/dashboard');
        } else {
            this.setState({ alert: 'Preencha todos os campos' });
        }
    }

    componentDidMount() {
        if (!firebase.getCurrent()) {
            this.props.history.replace("/");
            return null;
        }
    }


    render() {
        return (
            <div>
                <header id="new">
                    <Link to="/dashboard">Voltar</Link>
                </header>

                <form onSubmit={this.cadastrar} id="newPost">
                    <span>{this.state.alert}</span>
                    <label>Título</label><br />
                    <input type="text" placeholder="Nome do post" value={this.state.titulo} onChange={(e) => this.setState({ titulo: e.target.value })} /> <br />

                    <label>URL Imagem</label><br />
                    <input type="text" placeholder="URL da Imagem" value={this.state.imagem} onChange={(e) => this.setState({ imagem: e.target.value })} /> <br />

                    <label>Descrição</label><br />
                    <textarea type="text" placeholder="Descrição da Postagem" value={this.state.descricao} onChange={(e) => this.setState({ descricao: e.target.value })} /> <br />

                    <button type="submit">Cadastrar</button>


                </form>

            </div>
        )
    }
}

export default withRouter(New)