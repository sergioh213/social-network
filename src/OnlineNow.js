import React, {Component} from 'react'
import axios from './axios'
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        users: state.users
    }
}

class OnlineNow extends Component {
    constructor(props) {
        super(props)

        this.state = {}
    }

    componentDidMount() {
    }

    render() {
        console.log('this.props.users: ', this.props.users);
        return (
            <div id="online-now">
                <h1>CURRENT USERS ONLINE</h1>
                { this.props.users &&
                    this.props.users.map(
                        user => (
                            <div key={user.id} className="user">
                                { user.first_name }
                            </div>
                        )
                    )
                }
            </div>
        )
    }
}

export default connect(mapStateToProps)(OnlineNow)
