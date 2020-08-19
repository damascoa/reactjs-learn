import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import firebase from '../../firebase';
import './login.css';

class Login extends Component {


    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        }

        this.entrar = this.entrar.bind(this);
        this.login = this.login.bind(this);


    }

    componentDidMount() {
        //verificar se tem usuario logado
        if (firebase.getCurrent()) {
            return this.props.history.replace('dashboard');
        }
    }

    entrar(e) {
        e.preventDefault();
        this.login();
    }

    login = async () => {
        const { email, password } = this.state;
        console.log(password);
        try {
            await firebase.login(email, password)
                .then((e) => {
                    console.log(e)
                    this.props.history.replace('/dashboard');
                })
                .catch((e) => {
                    if (e.code === 'auth/user-not-found') {
                        alert('Usuario inexistente!');
                    } else {
                        alert('Codigo de erro ' + e.code);
                        return;
                    }
                })


        } catch (error) {
            alert(error.message);
            console.log(error);
        }
    }


    render() {
        return (
            <div>
                <form onSubmit={this.entrar} id="login">
                    <label>Email: </label><br />
                    <input type="email" value={this.state.email} onChange={(e) => this.setState({ email: e.target.value })} placeholder="email@email.com.br" /> <br />
                    <label>Senha: </label><br />
                    <input type="password" value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })} placeholder="******" /> <br />

                    <button type="submit">Entrar</button>

                    <Link to="/register">Cadastrar Nova Conta</Link>
                </form>
            </div>
        )
    }
}

export default withRouter(Login);