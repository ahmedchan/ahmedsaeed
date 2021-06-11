import React from 'react'
import locationIcon from './../img/icons/location.svg'
import phoneIcon from './../img/icons/call.svg'
import emailIcon from './../img/icons/email.svg'

const ContactInfo = () => {
   return (
      <ul className="contact_list">
         <li className="contact_item">
            <div className="icon"><img src={locationIcon} alt="" /> </div>
            <div className="contact_text">
               <span>3 Mohamed Saber ST.</span>
               <div>Basus, Qalybia, Egypt</div>
            </div>
         </li>
         <li className="contact_item">
            <div className="icon"><img src={phoneIcon} alt="" /></div>
            <div className="contact_text">
               <span>Contact Phone</span>
               <div><a className="link" href="tel:+201067258000">01067258000</a></div>
            </div>
         </li>
         <li className="contact_item">
            <div className="icon"><img src={emailIcon} alt="" /></div>
            <div className="contact_text">
               <span>Contact E-Mail</span>
               <div><a className="link" href="mailto:mr.ahmedsaeed1@gmail.com" target="_top">mr.ahmedsaeed1@gmail.com</a></div>
            </div>
         </li>
      </ul>
   );
}

export default ContactInfo