import React from 'react'
import { Link } from 'react-router-dom'

function Abc() {
    return (
        <>
            <div id="elContent" className="container-fluid " style={{ background: "linear-gradient(to bottom,rgba(0, 123, 255, 0.22) 0%,rgba(64, 148, 148, 0) 48%),rgba(255, 255, 255, 0.0) background-size: cover position: relative" }}>
                <div className="ipsLayout_container" style={{ background: "rgba(0,0,0, 0.0)" }}>
                    <div className="row no-gutters">
                        <div className="col-lg-2 col-sm-4 col-xs-4 hover-img ipsGrid_span2">
                            <Link to="https://www.nvsp.in/" target="_blank" rel="noopener noreferrer">
                                <img src="/img/voter-services-icon.png" className="img-fluid" alt="Voter Services" title="Voter Services" />
                            </Link>
                        </div>
                        <div className="col-lg-2 col-sm-4 col-xs-4 hover-img ipsGrid_span2">
                            <Link to="https://eci.gov.in/voter/voter-education/" target="_blank">
                                <img src="/img/voter-education-icon.png" className="img-fluid" alt="Voter Education" title="Voter Education" />
                            </Link>
                        </div>
                        <div className="col-lg-2 col-sm-4 col-xs-4 hover-img ipsGrid_span2">
                            <Link to="https://eci.gov.in/elections/election/" target="_blank">
                                <img src="/img/election-icon.png" className="img-fluid" alt="Elections" title="Elections" />
                            </Link>
                        </div>
                        <div className="col-lg-2 col-sm-4 col-xs-4 hover-img ipsGrid_span2">
                            <Link to="https://eci.gov.in/candidate-political-parties/candidate-politicalparties/" target="_blank">
                                <img src="/img/political-party-icon.png" alt="Candidate/Political Party" title="Candidate/Political Party" />
                            </Link>
                        </div>
                        <div className="col-lg-2 col-sm-4 col-xs-4 hover-img ipsGrid_span2">
                            <Link to="https://eci.gov.in/media-publication/media-publication/" target="_blank">
                                <img src="/img/publication-icon.png" alt="Publications" title="Publications" />
                            </Link>
                        </div>
                        <div className="col-lg-2 col-sm-4 col-xs-4 hover-img ipsGrid_span2">
                            <Link to="https://eci.gov.in/divisions-of-eci/ict-apps/" target="_blank">
                                <img src="/img/ict-apps-icon.png" alt="ICT APPS" title="ICT APPS" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <br />
        </>
    )
}

export default Abc
