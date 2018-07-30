import React, {Component} from 'react'
import axios from './axios'

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
        return (
            <div id="opp">
                <h1>SOMEONE ELSES PROFILE</h1>
                <h3>{ `${ first_name } ${ last_name }`}</h3>
                <p>{bio}</p>
            </div>
        )
    }
}

export default Opp
