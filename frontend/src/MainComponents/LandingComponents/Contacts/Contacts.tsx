import React, { useState }from 'react'
import contact_bg from '../Assets/contact_bg.png'


const ContactInfoItem: React.FC<{ icon: React.ReactNode; title: string; detail: string }> = ({ icon, title, detail }) => (
    <div className="flex items-center gap-4">
        <div className="flex-shrink-0 h-14 w-14 flex items-center justify-center bg-bluehire-blue rounded-lg text-white">
            {icon}
        </div>
        <div>
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <p className="text-gray-600">{detail}</p>
        </div>
    </div>
);

const Contact: React.FC = () => {
    const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Form Submitted: ", formData);
        alert('Thank you for your message!');
        setFormData({ name: "", email: "", phone: "", message: "" });
    };

    return (
        <section id="contact" className="py-16 md:py-24 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-28 mt-12">
                
                <div 
                    className="rounded-2xl bg-cover bg-center h-48 md:h-64 flex items-center px-8 md:px-4"
                    style={{ backgroundImage: `url(${contact_bg})`}}
                >
                    <h2 className="lg:text-6xl lg:ml-10 lg:pl-12 lg:pb-2 md:text-5xl text-4xl md:pl-8 pl-2 md:pb-12 pb-10 font-gabarito font-bold text-white text-shadow-lg">Contact Us</h2>
                </div>

                <div className="w-full text-left my-12 lg:pl-12 pl-8 lg:mt-12 mt-8">
                     <p className="lg:text-4xl text-2xl text-gray-700">
                        Got inquiries? Connect with <span className="font-gabarito font-bold"><span className="text-bluehire-blue">Blue</span><span className="text-bluehire-dark">Hire</span></span> today.
                    </p>
                </div>
                
                <div className="grid lg:grid-cols-2 gap-12 items-start lg:pl-12 px-8">
                    <div className="space-y-8">
                        <div>
                            <h3 className="lg:text-3xl text-xl font-gabarito font-bold text-gray-800">Get In Touch</h3>
                            <hr className="w-24 mt-2 border-t-4 border-blue-500"/>
                        </div>
                        <p className="text-gray-600">
                            Reach us through email, phone, or social media for any questions or support. Choose the option that’s most convenient for you, and we’ll respond as soon as possible.
                        </p>
                        <div className="space-y-6">
                            <ContactInfoItem 
                                icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>}
                                title="Phone"
                                detail="(+63) 9533923688"
                            />
                            <ContactInfoItem 
                                icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}
                                title="Email"
                                detail="bluehire@gmail.com"
                            />
                            <ContactInfoItem 
                                icon={<svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.012-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.08 2.525c.636-.247 1.363-.416 2.427-.465C9.53 2.013 9.884 2 12.315 2zM12 8.118a3.868 3.868 0 100 7.736 3.868 3.868 0 000-7.736zM12 14.15a2.15 2.15 0 110-4.3 2.15 2.15 0 010 4.3z" clipRule="evenodd" /></svg>}
                                title="Instagram"
                                detail="bluehire.com"
                            />
                        </div>
                    </div>

                    <div className="bg-bluehire-card-blue p-8 rounded-2xl">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-white">Name</label>
                                    <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full px-3 py-2.5 bg-bluehire-form-bg border-none rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300"/>
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-white">Email</label>
                                    <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required className="mt-1 block w-full px-3 py-2.5 bg-bluehire-form-bg border-none rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300"/>
                                </div>
                            </div>
                             <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-white">Phone</label>
                                <input type="tel" name="phone" id="phone" value={formData.phone} onChange={handleChange} className="mt-1 block w-full px-3 py-2.5 bg-bluehire-form-bg border-none rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300"/>
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-white">Message</label>
                                <textarea name="message" id="message" rows={4} value={formData.message} onChange={handleChange} required className="mt-1 block w-full px-3 py-2.5 bg-bluehire-form-bg border-none rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none"></textarea>
                            </div>
                            <div className="text-right">
                                <button type="submit" className="inline-flex justify-center py-2 px-8 border-2 border-white rounded-md shadow-sm text-base font-medium text-white bg-transparent hover:bg-white hover:text-bluehire-card-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-bluehire-card-blue focus:ring-white transition-colors">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;