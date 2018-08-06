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
        var profileResizableHeight = 200
        var bioSectionHeight = 92
        var textareaHeight = 210
        var profileBoxVerticalPos = 400
        var pStyle = {
            padding: 0,
            margin: 0
        }
        var titleStyle = {
            left: '50%',
            transform: 'translateX(-50%)',
            top: '100px',
            position: 'absolute',
            color: '#5D3440',
            fontWeight: 'bold',
        }
        var profileStyle = {
            position: 'absolute',
            display: 'inline',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '700px',
            top: profileBoxVerticalPos,
            backgroundColor: '#EDCBB1',
            padding: 0,
            height: profileResizableHeight,
            borderRadius: '19px',
            paddingBottom: 20
        }
        var textBoxStyle = {
            paddingTop: 20,
            paddingRight: '20px',
            paddingLeft: '20px',
            verticalAlign: 'top',
            width: '500px',
            height: '200px',
            position: 'relative',
            display: 'inline-block'
        }
        var sectionHeader = {
            margin: 0
        }
        var nameStyle = {
            margin: 0
        }
        var bioStyle = {
            margin: 0,
            cursor: 'pointer',
            fontSize: '16px'
        }
        var bioSection = {
            backgroundColor: '#BFB59E',
            padding: '10px',
            marginTop: '10px',
            borderRadius: "0px 8px 8px 0px",
            minHeight: bioSectionHeight
        }
        var boxStyle = {
            width: '200px',
            height: '200px',
            display: 'inline-block'
        }
        var picStyle = {
            width: '200px',
            height: '200px',
            display: 'inline-block',
            objectFit: 'cover',
            objectPosition: 'center'
        }
        var wrapper = {
            backgroundColor: '#EDCBB1',
            padding: 10,
            width: 'auto',
            height: 'auto',
            textAlign: 'center',
            position: 'absolute',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            top: profileResizableHeight + 25
        }
        const { first_name, last_name, id, image, bio } = this.state
        if (!id) {
            return null;
        }
        return (
            <div id="profile" >

                <h1 id="title" style={titleStyle} >OPP</h1>

                <div id="profile-box" style={profileStyle}>
                    <div id="profile" style={boxStyle}>
                        <img id="profile-pic" src={ image } style={picStyle} alt=""/>
                    </div>
                    <div id="text-box" style={textBoxStyle}>
                        <h3 id="section-header" style={sectionHeader}>Someone else's profile</h3>
                        <h1 style={nameStyle}>{ `${ first_name } ${ last_name }` }</h1>
                        <div id="bio-section" style={bioSection}>
                            <p style={pStyle}>{ bio } </p>
                        </div>
                    </div>
                    <div style={wrapper}>
                        <FriendButton id={ id } />
                    </div>
                </div>

                <Logo />

            </div>
        )
        // (
        //     <div id="profile" style={boxStyle}>
        //         <img id="profile-pic" src={ image } style={picStyle} alt=""/>
        //         {/*<h1>SOMEONE ELSES PROFILE</h1>*/}
        //         <h3>{ `${ first_name } ${ last_name }'s profile` }</h3>
        //         <p>{ bio }</p>
        //         <FriendButton id={ id } />
        //         <Logo currentPage={`SOMEONE ELSE'S PROFILE`} />
        //     </div>
        // )
    }
}

export default Opp
