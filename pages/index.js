import React from 'react'
import PropTypes from 'prop-types'

const textAlignCenter = {
  textAlign: 'center'
}

const LandingPage = ({ type }) => (
  <div>
    <div className="bg-img"></div>
    <section>
      <div className="floating-signup__wrap col-xs-12 col-md-6 col-xs-offset-0 col-md-offset-3 floaty-vertical--middle floaty-horizontal--center floaty-unfloat-at--xs">
        <div className="floating-signup rel">
          <div className="container-fluid rel">
            <div className="row">
              <div className="user-signup__intro">
                <h1 style={{fontSize: 50,...textAlignCenter}}>Show and tell for React Native developers</h1>
                <p style={textAlignCenter}>
                  <img src="/static/images/spacer.png" alt="" className="spacer insert--image wrap-off-align-center"/><br/>
                </p>
                <p style={{...textAlignCenter,fontSize: 19 , color: 'lightgrey'}}>
                  <strong style={{color: 'white'}}>What are you working on?</strong>
                  <br/>
                  React Native Gallery is where developers get popularity and hired.
                </p>
                <p style={textAlignCenter}>
                  <img src="/static/images/clean-hr.png" alt="" className="clean-hr insert--image wrap-off-align-center"/>
                  <span style={{fontSize: 14}}>Enter your email address if you want to be informed when it's ready 🎉</span>
                </p>
              </div>
            </div>
            <div className="row">
              <form className="form form-horizontal user-signup__form" name="form" noValidate="" action="https://xavier-carpentier.us7.list-manage.com/subscribe/post?u=4ce4b6f2b07a9f4f5836245a9&amp;id=8445b37233" method="POST" target="_blank">
                <div className="mt-table--full">
                  <div className="mt-td--centered-vertical user-signup__col-1">
                    <div className="user-signup__form-group m-lg-v form-group col-sm-12">
                      <input
                        type="email"
                        name="EMAIL"
                        className="form-control form-control__input user-signup__email"
                        placeholder="Email"
                        aria-required="true"
                        required="required"
                        />
                      <input
                        type="hidden"
                        name="TYPE"
                        value={type}
                      />
                    </div>
                  </div>
                  <div className="mt-td--centered-vertical user-signup__col-2">
                    <div className="user-signup__form-group m-lg-v form-group text-center">
                      <button type="submit" className="btn btn-default submit user-signup__submit"><span>SUBMIT</span></button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
)

LandingPage.propTypes = {
  type: PropTypes.string.isRequired,
}

LandingPage.defaultProps = {
  type: 'developer'
}

LandingPage.getInitialProps = async ({ query }) => {
  const { utm_campaign } = query
  return { type: utm_campaign ? utm_campaign : 'developer'}
}

export default LandingPage