import React, { useState }from 'react'
import './Contacts.css'
import agent from '../Assets/agent.png'
import ig_icon from '../Assets/contact_ig_icon.png'
import email_icon from '../Assets/contact_email_icon.png'
import phone_icon from '../Assets/contact_tel_icon.png'

const Contacts = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");
      
      const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => { 
        e.preventDefault();
        console.log("Submitted: ", {name})
      }


  return (
    <div>
        <div className="contacts">
            <div className="contacts-bg">
                <h1>Contact Us</h1>
                <img src={agent} alt="Call Center Agent" />
            </div>
            <div className="contact-msg">
                <h1>Got inquiries? Connect with</h1>
                <div className="bluehire-txt">
                    <h1 className="blue">Blue</h1>
                    <h1 className="hire">Hire</h1>
                </div>
                <h1>today.</h1>
            </div>
            <div className="contact-lower">
                <div className="contact-left">
                    <hr />
                    <div className="contact-left-header">Get In Touch</div>
                    <div className="contact-left-desc">
                        Reach us through email, phone, or social media for any questions or support. Choose the option that’s most convenient for you, and we’ll respond as soon as possible.
                    </div>
                    <div className="icons">
                        <div className="contact-icons">
                            <img src={phone_icon} alt="Phone Icon" />
                            <div className="details">
                                <h1>Phone</h1>
                                <p>(+63) 9533923688</p>
                            </div>
                        </div>
                        <div className="contact-icons">
                            <img src={email_icon} alt="Email Icon" />
                            <div className="details">
                                <h1>Email</h1>
                                <p>bluehire@gmail.com</p>
                            </div>
                        </div>
                        <div className="contact-icons">
                            <img src={ig_icon} alt="Instagram Icon" />
                            <div className="details">
                                <h1>Instagram</h1>
                                <p>bluehire.com</p>
                            </div>
                        </div>
                    </div>
                    <hr />
                </div>
                <div className="contact-right">
                    <form onSubmit={handleSubmit}>
                        <div className="name-email">
                            <div className="field">
                                <label>Name</label>
                                <input 
                                placeholder="Name"
                                type="text" 
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="field">
                                <label>Email</label>
                                <input 
                                placeholder="Email"
                                type="text" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="phone-message">
                            <div className="field">
                                <div className="phone-input">
                                    <label>Phone</label>
                                    <input 
                                    placeholder="Phone"
                                    type="text" 
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <div className="message-input">
                                    <label>Message</label>
                                    <textarea
                                    placeholder="Message"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    />
                                </div>
                                </div>
                            <div className="contact-btn">Submit</div>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    </div>
  )
}

export default Contacts