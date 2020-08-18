import React, { Component } from 'react';
import '../../global.css';
import './home.css';
import firebase from '../../firebase';

class Home extends Component {


    state = {
        posts: [
            {
                key: "1", titulo: "JavaScript",
                descricao: "JavaScript é uma linguagem de programação que permite implementar funcionalidades mais complexas em páginas web. Sempre que uma página web faz mais do que apenas mostrar informações estáticas para você - ela mostra em tempo real conteúdos atualizados, mapas interativos, animações gráficas em 2D/3D, vídeos, etc. -  você pode apostar que o Javascript provavelmente está envolvido.",
                autor: "Renato",
                imagem: "data:image/png;base64,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"
            },
            {
                key: "2", titulo: "AngularJS",
                descricao: "AngularJS é um framework JavaScript código aberto, mantido pelo Google, que auxilia na execução de single-page applications.",
                autor: "Renato",
                imagem: "https://rafaell-lycan.com/assets/images/posts/comecando-com-angular.jpg"
            },
        ]
    }


    componentDidMount() {
        // firebase.app.ref('posts').once('value', snapshot => {
        //     console.log('oi')
        //     let state = this.state;
        //     state.posts = [];
        //     snapshot.forEach((child) => {
        //         state.posts.push({
        //             key: child.key,
        //             titulo: child.val().titulo,
        //             descricao: child.val().descricao,
        //             imagem: child.val().imagem,
        //             autor: child.val().autor
        //         })
        //     })
        //     this.setState(state);
        // });

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
