import React, { Component } from 'react';
import '../../global.css';
import './home.css';
import firebase from '../../firebase';

class Home extends Component {


    state = {
        posts: [
            {
                key: "1", titulo: "",
                descricao: "",
                autor: "Renato",
                image: ""
            },
            {
                key: "2", titulo: "",
                descricao: "",
                autor: "Renato",
                image: ""
            },
        ]
    }


    componentDidMount() {
        firebase.app.ref('posts').once('value', snapshot => {
            console.log('oi')
            let state = this.state;
            state.posts = [];
            snapshot.forEach((child) => {
                state.posts.push({
                    key: child.key,
                    titulo: child.val().titulo,
                    descricao: child.val().descricao,
                    imagem: child.val().image,
                    autor: child.val().autor
                })
            });
            state.posts.reverse();
            this.setState(state);
        });

    }

    render() {
        return (
            <section id="post">
                {
                    this.state.posts.map((post) => {
                        return (
                            <article key={post.key}>
                                <header>
                                    <div className="title">
                                        <strong>
                                            {post.titulo}
                                        </strong>
                                        <span>
                                            Autor: {post.autor}
                                        </span>
                                    </div>
                                </header>
                                <img src={post.imagem} alt="capa" />
                                <footer>
                                    <p>{post.descricao}</p>
                                </footer>
                            </article>
                        )
                    })
                }
            </section>
        )
    }
}

export default Home;
