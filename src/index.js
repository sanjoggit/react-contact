import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
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
        this.updateEditContact = this.updateEditContact.bind(this);
        this.sortByName = this.sortByName.bind(this);
        this.sortByEmail = this.sortByEmail.bind(this);
        this.sortByNumber = this.sortByNumber.bind(this);

        this.state = {
            users: [],
            currentContact:{
                name: '',
                email: '',
                phone: '',
            },
            order: false
        }

    }

    componentDidMount() {
        $.get({
            //url: 'http://localhost:3000/users.json',
            url: 'https://mysterious-dawn-49360.herokuapp.com/users.json',
        }).done(function(data) {
            this.setState({users: data.contacts})
        }.bind(this))

        //for sorting arrow code below

        $('.sortable').click(function(){
            const sort = $(this).hasClass('asc') ? 'desc' : 'asc';
            $('.sortable').removeClass('asc').removeClass('desc');
            $(this).addClass(sort);

        });

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
            id: this.state.users.length+1,
            name: currentContact.name,
            email: currentContact.email,
            phone: currentContact.phone,
        });

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

    sortByName(){
        const userOrder = !this.state.order
        this.setState({ order: userOrder })
        let contacts = this.state.users

        contacts.sort(function (a, b) {
            const x = a.name.toLowerCase();
            const y = b.name.toLowerCase();
            if(userOrder) {
                if(x < y) return -1
                if(x > y) return 1
                return 0
            } else {
                if(x < y) return 1
                if(x > y) return -1
                return 0
            }
        });

        this.setState({ users: contacts})
    }
    sortByEmail(){
        const userOrder = !this.state.order
        this.setState({ order: userOrder })
        let contacts = this.state.users

        contacts.sort(function (a, b) {
            const x = a.email.toLowerCase();
            const y = b.email.toLowerCase();
            if(userOrder) {
                if(x < y) return -1
                if(x > y) return 1
                return 0
            } else {
                if(x < y) return 1
                if(x > y) return -1
                return 0
            }
        });

        this.setState({ users: contacts})
    }
    sortByNumber(){
        const userOrder = !this.state.order
        this.setState({ order: userOrder })
        let contacts = this.state.users

        contacts.sort(function (a, b) {
            const x = a.phone;
            const y = b.phone;
            if(userOrder) {
                return x-y
            } else {
                return y-x
            }

        });
        this.setState({ users: contacts})
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
                            <thead>
                            <tr>
                                <th className="sortable asc" onClick={this.sortByName}>Name</th>
                                <th className=" email sortable" onClick={this.sortByEmail}>E-mail address</th>
                                <th className="sortable" onClick={this.sortByNumber}>Phone number</th>
                                <th></th>
                            </tr>
                            </thead>
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
