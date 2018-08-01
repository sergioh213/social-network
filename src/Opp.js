import React, {Component} from 'react'
import axios from './axios'
import FriendButton from './FriendButton'
import Logo from './Logo'

class Opp extends Component {
    constructor(props) {
        super(props)

        this.state = {}
    }
    componentDidMount() {
        console.log("is this happening??");
        axios.get('/user/' + this.props.match.params.id + '.json')
            .then(({data}) => {
                if (data.redirect) {
                    console.log("this is your own profile");
                    this.props.history.push("/")
                } else {
                    console.log("visited profile info: ", data);
                    this.setState(data)
                }
            })
    }
    render() {
        const { first_name, last_name, id, image, bio } = this.state
        if (!id) {
            return null;
        }
        return (
            <div id="profile">
                <img id="profile-pic" src={ image } alt=""/>
                {/*<h1>SOMEONE ELSES PROFILE</h1>*/}
                <h3>{ `${ first_name } ${ last_name }` } PROFILE</h3>
                <p>{ bio }</p>
                <FriendButton id={ id } />
                <Logo currentPage={`SOMEONE ELSE'S PROFILE`} />
            </div>
        )
    }
}

export default Opp
