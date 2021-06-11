import React, {Component} from 'react'
//import { CSSTransition } from 'react-transition-group'
import { Link } from "react-router-dom"
import PortfolioList from './PortfolioList'
import { Tween } from 'react-gsap'
import { portfolioRef, storage } from '../FireBaseConfig'
//import { TimelineLite, CSSPlugin } from "gsap/all"
import Spinner from './Spinner'
import Modal from './Modal'
//import Backdrop from './Backdrop'
import PortfolioForm from './PortfolioForm'
import PortfolioFilter from './PortfolioFilter'

const portfolioCategories = [ "All", "Adsia", "Moselay", "Mazeed",  "Freelance", "ThemeForest" ];

class Portfolio extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeCategory: 'all',
      loading: true,
      portfolio: [],
      showModal: null
    }

    //this.portfolioURL = portfolioRef.orderByKey()
    this.portfolioURL = portfolioRef
  }

  componentDidMount = () =>  {
    console.log('mounted!')
    this.getPortfolio()
  }

  async getPortfolio(){
    if(this.props.count) {
      //this.portfolioURL = portfolioRef.limitToLast(this.props.count)
    }

    let portfolio = []
    const data = await this.portfolioURL.get()
    data.docs.forEach(snap => { 
      let item = snap.data()
      item.key = snap.id
      portfolio.push(item)
    })
    this.setState({
      portfolio,
      loading: false
    })
  }

  // componentWillUnmount = () => this.portfolioURL = null

  createPortfolioItem = item => {
    if (item) {
      portfolioRef.add(item).then(()=>{
        const newprotifilos = this.state.portfolio
        newprotifilos.push(item)
        this.setState({portfolio: newprotifilos})
      }).catch(err=>{
        console.log('err: ', err)
      })
      this.closeModal()
    }
  }

  openCreateModal = evt => {
    evt && evt.preventDefault()

    const modal = (
      <Modal classes="modal_small" title="Add item">
        <PortfolioForm
          categories={portfolioCategories}
          onCreatePortfolioItem={this.createPortfolioItem}
          onCloseModal={this.closeModal}
        />
      </Modal>
    )

    this.setState({ showModal: modal })
  }

  closeModal = () => this.setState({ showModal: null })

  removePortfolio = item => {
    const protfolioItemID = item.key
    const imgName = item.metadata.img_name
    portfolioRef.child(protfolioItemID).remove()
    storage
      .ref()
      .child("portfolio_images")
      .child(imgName)
      .delete()
  }

  renderLoading() {
    return (
      <div style={{ textAlign: "center", padding: "60px" }}>
        <Spinner />
      </div>
    )
  }

  renderPortfolioList() {
    if (!this.state.portfolio || !this.state.portfolio.length) {
      return (
        <div style={{ margin: "24px", padding: "24px", textAlign: "center" }}>
          No portfolio yet to be displaied! stay tuned.
        </div>
      )
    }

    return (
      <PortfolioList
        activeCategory={this.state.activeCategory}
        isEditable={this.props.isEditable}
        items={this.state.portfolio}
        onRemovePortfolioItem={this.removePortfolio}
      />
    )
  }


  handleCategotyChange = category => {
    this.setState({activeCategory: category})
  }

  render(){ 
    return (
      <section className="section portfolio padd-box">
      
        <Tween
          from={{ css: { y: '-100%', opacity:0}}}
          ease="Back.easeOut"
          duration={2}>
          <header className="sec_heading">
            <h3 className="title">Portfolio</h3>
            {this.props.isEditable &&
            <button
              className="button button_small button_default"
              onClick={this.openCreateModal}>
              Add portfolio item
            </button>
            }
            {this.props.renderViewPortfolio && <Link to={{
              pathname: "/portfolio",
              state:{modal:true}
            }}><button className="button button_small button_primary">View All Portfolio</button></Link>}
          </header>
        </Tween>

        <div className="pf-wrap">
          {this.props.renderFilter && (
            <PortfolioFilter
              activeCategory={this.state.activeCategory}
              onCategoryChange={this.handleCategotyChange}
              portfolioCategories={portfolioCategories} />
          )}

          {this.state.loading? this.renderLoading() : this.renderPortfolioList()}
        </div>

        {this.props.isEditable && this.state.showModal}
      </section>
    )
  }
}

export default Portfolio