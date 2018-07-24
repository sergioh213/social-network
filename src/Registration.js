import React, {Component} from 'react'
import axios from 'axios'

class Registration extends Component {
    constructor() {
        super()

        this.state = {
            error: null
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e) {
        this.setState({
            [ e.target.name ]: e.target.value
        }, () => {
            console.log(this.state);
        })
        console.log('hey');
    }

    handleSubmit(e) {
        e.preventDefault()
        console.log("running handleSubmit()", this.state);

        axios.post("/registration", this.state)
            .then((res) => {
                console.log(res.data.error);
                if (res.data.error) {
                    this.setState({
                        error: res.data.error
                    })
                } else {
                    location.replace("/")
                }
            })
    }

    render() {
        return (
            <div className="registration">
                <h1>Registration</h1>

                <img src="/content/logo-flanet-long-transparent.png" alt=""/>

                {
                    this.state.error
                        ? <div>ERROR: {this.state.error}</div>
                        : null
                }

                <form onSubmit={ this.handleSubmit }>
                    <input onChange={ this.handleChange } name="first_name" placeholder=' First name' type='text'/>
                    <input onChange={ this.handleChange } name="last_name" placeholder=' Last name' type='text'/>
                    <input onChange={ this.handleChange } name="email" placeholder=' Email' type='text'/>
                    <input onChange={ this.handleChange } name="password" placeholder=' Password' type='text'/>
                    <button>Submit</button>
                    {/*<input type="hidden" name="_csrf" value="{{csrfToken}}" />*/}
                </form>

                <h3>Already a member? <a href="/">Log in</a></h3>
            </div>
        )
    }
}

export default Registration
