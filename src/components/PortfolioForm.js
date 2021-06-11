import React, { Component } from 'react'
import { storage } from '../FireBaseConfig'
import Dropzone from 'react-dropzone'
import ProgressBar from './ProgressBar'


const imageMaxSize = 10000000000000000 // bytes
const acceptedFilesType = 'image/x-png, image/png, image/jpg, image/jpeg, image/gif'
const acceptedFilesTypeArray = acceptedFilesType.split(',').map(image => image.trim())

const validURL = str => {
   var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
   return !!pattern.test(str);
}

class PortfolioForm extends Component {
   constructor(props) {
      super(props);
      this.state = {
         saving: false,
         progress: 0,
         item: {
         title: "",
         desc: "",
         url: "",
            category:""
         },
         files: [],
         errors: {},
         imgSrc: ""
      };
   }

   verifyFiles = files => {
      if (files && files.lengh) {
         const currentFile = files[0];
         const currentFileType = currentFile.type;
         const currentFileSize = currentFile.size;

         if (currentFileSize > imageMaxSize) {
         alert("image size is too large!");
         return false;
         }
         if (!acceptedFilesTypeArray.includes(currentFileType)) {
         alert("image type is not supported yet!");
         return false;
         }
         return true;
      }
   } 

   handleChange = evt => {
      const field = evt.target.name
      let item = this.state.item
      item[field] = evt.target.value

      if (!!this.state.errors[field]) {
         let errors = Object.assign({}, this.state.errors)
         delete errors[field];
         return this.setState({ item, errors })
      } else {
         return this.setState({ item })
      }
   }

   handleOnDrop = (files, rejectedFiles) => {
      if (rejectedFiles && rejectedFiles.lengh) {
         this.verifyFiles(rejectedFiles);
      }

      if (files && files.length) {
         const isVerified = this.verifyFiles(files);
         //if ( isVerified ){
         this.setState({ files: files });
         const currentFile = files[0];
         const reader = new FileReader();
         reader.addEventListener(
         "load",
         () => {
            this.setState({ imgSrc: reader.result });
         },
         false
         );
         reader.readAsDataURL(currentFile);

         //}
      }
   }

   removeSelectedImage = evt => {
      evt && evt.preventDefault()
      return this.setState({
         files: [],
         imgSrc: null
      })
   }

   validateForm = () => {
      let errors = {}
      const {title, url, category} = this.state.item
      const {imgSrc}= this.state

      if (title === ''){
         errors.title = 'title can not be empty'
      }
      
      if (url === '' ) {
         errors.url = "Url can not be empty"
      } else if (!validURL(url)) {
         errors.url = "invalid url"
      }

      if (category === "") {
         errors.category = "please selected project category"
      }

      if (imgSrc === "") {
         errors.img = "please selected project category";
      }

      this.setState({ errors })
      return Object.keys(errors).length === 0 ? true : false
   }

   handleOnSubmut = evt => {
      evt && evt.preventDefault()

      if(!this.validateForm()){
         return
      }

      this.setState({ saving: true })
      const { title, url, desc, category } = this.state.item
      const file = this.state.files[0]
      const portfolioMetadata = { cacheControl: "max-age=" + 60 * 60 * 24 * 365 }
      const uploadTask = storage
         .ref("portfolio_images/" + file.name)
         .put(file, portfolioMetadata)

      uploadTask.on(
         "state_changed",
         snapshot => {
         return this.setState({
            progress: (snapshot.bytesTransferred / snapshot.totalBytes) * 100
         })
         },
         err => { console.log("errors: ", err) },
         () => {
            storage
               .ref("portfolio_images")
               .child(file.name)
               .getDownloadURL()
               .then(imgURL => {
                  const metadata = uploadTask.metadata_;
                  const key = metadata.md5Hash.replace("///g", ":");
                  const fileRecord = {
                     img_downloadURL: imgURL,
                     key: key,
                     metadata: {
                        title,
                        desc,
                        url,
                        category,
                        img_name: metadata.name,
                        img_fullPath: metadata.fullPath,
                        md5Hash: metadata.md5Hash
                     }
                  }

                  console.log('fileRecord:', fileRecord)

                  this.props.onCreatePortfolioItem(fileRecord);
               });
         }
      );
   }

   handleOnCancel = evt => {
      evt && evt.preventDefault()
      this.props.onCloseModal()
   }

   render() {
      return (
         <form
         key="portfolio_form"
         className="portfolio_form block_labels"
         onSubmit={this.handleOnSubmut}
         >
         <div className="form_row">
            <label
               htmlFor="portfolio_title"
               className="form_label"
               name="title"
            >
               Title
            </label>

            <input
               name="title"
               className="form_input"
               value={this.state.item.title}
               onChange={this.handleChange}
               disabled={this.state.saving}
               id="portfolio_title"
               placeholder="title..."
            />
            <div className="error">
               <small>{this.state.errors.title}</small>
            </div>
         </div>

         <div className="form_row">
            <label
               htmlFor="portfolio_title"
               className="form_label"
               name="title"
            >
               Category
            </label>
            <select
               name="category"
               className="form_input"
               value={this.state.item.category}
               onChange={this.handleChange}
               disabled={this.state.saving}
               id="portfolio_category"
            >
               <option value="">--Select Category--</option>
               {this.props.categories.map(category => (
                  <option value={category.toLowerCase()} key={category}>
                  {category}
               </option>
               ))}
            </select>
            <div className="error">
               <small>{this.state.errors.category}</small>
            </div>
         </div>

         <div className="form_row">
            <label
               htmlFor="portfolio_img"
               className="form_label"
               name="title"
            >
               Image
            </label>
            <Dropzone
               onDrop={this.handleOnDrop}
               name="img"
               multiple={false}
               accept={acceptedFilesType}
               id="portfolio_img"
            >
               {({ getRootProps, getInputProps }) => (
               <section>
                  <div {...getRootProps()}>
                     <input {...getInputProps()} />
                     <div className="dropzone">
                     Drag 'n' drop some files here, or click to select files.
                     </div>
                  </div>
               </section>
               )}
            </Dropzone>
            {this.state.imgSrc && (
               <div className="selected_images">
               <img src={this.state.imgSrc} alt="" />
               <button
                  type="button"
                  className="button button_small button_default remove"
                  onClick={this.removeSelectedImage}
               >
                  Remove
               </button>
               </div>
            )}
            <div className="error">
               <small>{this.state.errors.img}</small>
            </div>
         </div>

         <div className="form_row">
            <label
               htmlFor="portfolio_url"
               className="form_label"
               name="title"
            >
               Url
            </label>
            <input
               name="url"
               className="form_input"
               value={this.state.item.url}
               onChange={this.handleChange}
               disabled={this.state.saving}
               id="portfolio_url"
               placeholder="url..."
            />
            <div className="error">
               <small>{this.state.errors.url}</small>
            </div>
         </div>

         <div className="form_row">
            <label htmlFor="portfolio_desc" className="form_label">
               Breif
            </label>
            <textarea
               name="desc"
               className="form_input"
               value={this.state.item.desc}
               disabled={this.state.saving}
               onChange={this.handleChange}
               id="portfolio_desc"
               placeholder="descraption..."
            />
         </div>

         {this.state.saving ? (
            <ProgressBar value={this.state.progress} title="uploading..." />
         ) : (
            <div className="form_row">
               <button
               type="submit"
               onClick={this.handleOnSubmut}
               disabled={this.state.saving}
               className="button button_wide button_primary"
               >
               Submit
               </button>
               <button
               type="button"
               onClick={this.handleOnCancel}
               className="button button_wide button_default"
               >
               Cancel
               </button>
            </div>
         )}
         </form>
      );
   }
}

export default PortfolioForm