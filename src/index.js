import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery'
import './index.css';
import logo from './images/nord.png'
import ContactDetail from './components/ContactDetail';
import ContactForm from './components/ContactForm';


class Contacts extends React.Component{
    constructor(){
        super();
        this.updateContact = this.updateContact.bind(this);
        this.addContact = this.addContact.bind(this);
        this.deleteContact = this.deleteContact.bind(this);
        this.updateEditContact = this.updateEditContact.bind(this); // for edited contact
        this.state = {
            users: [],
            currentContact:{
                name: '',
                email: '',
                phone: '',
            }
        }

    }

    componentDidMount() {
        $.get({
            url: 'http://localhost:3000/users.json',
        }).done(function(data) {
            this.setState({users: data.contacts})
        }.bind(this))
    }

    deleteContact(index){
        let contacts = this.state.users;
        contacts.splice(index, 1);
        this.setState({
            contacts
        })
    }
    addContact(evt){
        evt.preventDefault();
        let contacts = this.state.contacts;
        let currentContact = this.state.currentContact;
        this.state.users.unshift({
            name: currentContact.name,
            email: currentContact.email,
            phone: currentContact.phone,
        })
        this.setState({
            contacts: contacts,
            currentContact: {name: '', email:'', phone:''}
        })
    }

    updateContact(e){
        let currentContact = this.state.currentContact
        currentContact[e.target.name] = e.target.value
       this.setState({
            currentContact:currentContact,
        })
    }
    updateEditContact(index, newname, newemail, newphone){
        const users = this.state.users;
        const user = users[index];
        user['name']=newname;
        user['email']=newemail;
        user['phone']=newphone;
        this.setState({
            users
        })
    }


    render(){
        const users = this.state.users
        return(
            <div id="container">
                <header className="header">
                    <img src={logo} alt=""/><span><h2>Nord Software</h2></span>
                </header>
                <section className="content">
                    <h2>List of Participants</h2>

                    <div className="table-body">
                        <section>
                            <ContactForm
                                currentContact = {this.state.currentContact}
                                updateContact = {this.updateContact}
                                addContact = {this.addContact}
                            />
                        </section>
                        <table>
                            <tbody>
                            <tr>
                                <th>Name <i className="fa fa-arrow-down" aria-hidden="true"></i></th>
                                <th className="email">E-mail address</th>
                                <th>Phone number</th>
                                <th></th>
                            </tr>
                            </tbody>
                        </table>
                        {
                            Object.keys(users).map(key => (
                                <ContactDetail
                                    key={key}
                                    index = {key}
                                    detail = {users[key]}
                                    deleteContact = {this.deleteContact}
                                    updateEditContact = {this.updateEditContact}//for edited contact
                                />
                            ))
                        }

                    </div>

                </section>
            </div>
        )
    }


}


ReactDOM.render(<Contacts/>, document.getElementById('root'));
