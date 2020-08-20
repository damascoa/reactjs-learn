import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import firebase from '../../firebase';
import './dashboard.css';

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nome: localStorage.nome,
        }
        this.logout = this.logout.bind(this);
       
    }

    async componentDidMount() {
        if (!firebase.getCurrent()) {
            this.props.history.replace('/login');
            return null;
        }

        let user = firebase.getUser();
        user.then((data) => {
            localStorage.nome = data.email;
            this.setState({nome: data.email,email: data.email})
        })
    }

    logout = async () => {
        await firebase.logout()
        .catch((err) => {
            console.log(err)
        });

        this.props.history.push('/');
    }

    render() {
        return (
            <div id="dashboard">
                <div className="user-info">
                    <h1>Olá {this.state.nome}</h1>
                    <Link to="/dashboard/new" >Novo Post</Link>
                </div>
                <p>Logado com: {this.state.email}</p>

                <button onClick={() => this.logout()}>Deslogar</button>
            </div>

        )
    }
}

export default withRouter(Dashboard)