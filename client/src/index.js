//@flow
/* eslint eqeqeq: "off" */
import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { HashRouter, Route, NavLink } from 'react-router-dom';
import {
    Alert,
    Card,
    NavBar,
    Button,
    Column,
    Marquee,
    Page,
    LayoutPaper,
    CardOnPage, Row, CardOnFrontPage
} from './widgets';
import { createHashHistory } from 'history';
import axios from 'axios';
import {
  Artikkel,

  artikkelservice,
  Category,
  categoryService,
  Comment,
  commentService,
  CommentSend
} from "./service";
//import {Category, categoryService} from "./service";

const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

class LeggTil extends Component {
  categorys: Category[] =[];
  articleSend = new Artikkel(
      '',
      '',
      '',
      '',
      '',
      '',
      '',
  );
  form = null;

  render() {
    return (
     <Page>

        <Card title="Submit an article!">
          <div style={{alignItems: "center"}}>
          <form ref={e => {this.form = e}}>

            <div>
            <Column>kategori </Column>
            <Column>
              <select
                  required
                  aria-required={"true"}
                  value={this.articleSend.navnPost}
                  id="select"
                  onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                if (this.articleSend) this.articleSend.navnPost = event.target.value;
              }}>

                <option key={"navn"} defaultValue="default" hidden >Choose category</option>
                <option key={this.articleSend.navnPost} value={"News"}>News</option>
                {this.categorys.map(c => (
                    <option key={c.navn + c.id_c} value={c.navn}>{c.navn}</option>
                ))}
              </select>
            </Column>

            </div>
            <div>
              <Column >Overskrift</Column>
              <Column>
                <input
                    required
                    placeholder={"Skriv en overskrift"}
                    type="text"
                    onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                      if (this.articleSend) this.articleSend.overskrift = event.target.value;
                        this.articleSend.rate = 0;
                    }}
                />
              </Column>
            </div>


            <div>
              <Column>Brødtekst</Column>
              <Column>
                <textarea
                    required
                    placeholder={"Fyll inn din artikkels innhold"}
                    rows="10" cols="60"
                    type="text"
                    onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                      if (this.articleSend) this.articleSend.brodtekst = event.target.value;
                    }}
                />
              </Column>
            </div>



              <Column>Bilde URL</Column>
              <Column>
                <input
                    required
                    placeholder={"Kopier en bilde-URL path inn her"}
                    type="text"
                    onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                      if (this.articleSend) this.articleSend.bilde = event.target.value;
                    }}
                />
              </Column>

              <Column>Alt</Column>
              <Column>
                  <input
                      required
                      placeholder={"Legg inn en alt på bildet"}
                      type="text"
                      onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                          if (this.articleSend) this.articleSend.alt = event.target.value;
                      }}
                  />
              </Column>


              <Column>Forfatter</Column>
              <Column>
                  <input
                      required
                      placeholder={"Ditt navn"}
                      type="text"
                      onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                          if (this.articleSend) this.articleSend.forfatter = event.target.value;
                      }}
                  />
              </Column>

              <Column>Rating</Column>

              <Column>
                <select
                    required
                    aria-required={"true"}
                    id="select" value={this.articleSend.relevanse}
                    onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                  if (this.articleSend) this.articleSend.relevanse = event.target.value;
                }}>

                  <option key={"-"} value="" defaultValue="default" hidden>Choose priority</option>
                  <option key={""} value="1">1</option>
                  <option key={"2"} value="2">2</option>
                </select>
              </Column>

            <br></br>

            <Button.Save onClick={this.send}>Save</Button.Save>
          </form>
          </div>
        </Card>
     </Page>

    );
  }

  send() {
    if (!this.form || !this.form.checkValidity()) return;
    if (!this.articleSend) return null;
    artikkelservice.postArticle(this.articleSend)
        .then(() => {
          if(this.articleSend) history.push('/')
        })
        .catch((error: Error) => Alert.danger(error.message));
  }
  mounted() {
    categoryService.getCategory().then(cat => this.categorys = cat).catch(error => error.message);
  }
}


class Navbar extends Component {
  categorys: Category[] =[];
  input: string = "";



  render() {
    return <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-dark">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active" key="Hjem">
            <a className="navbar-brand" href="#/rel" style={{color:"white"}}>Home<span className="sr-only">(current)</span></a>
          </li>
          <li className="nav-item active" key="Add" style={{color:"white"}}>
            <a className="nav-link" href="#/add" style={{color:"white"}}>Add an article</a>
          </li>


          <li
              className="nav-item active"
              key="News">
            <NavBar.Link to="/" >News</NavBar.Link>
          </li>

          {this.categorys.map(c => (
              <li className="nav-item active"
                  key={c.navn} >
                <a href={"#/category/" + c.navn}
                   className="nav-link"
                   key={c.id_c} style={{color:"white"}}>{c.navn}</a>
              </li>
          ))}
        </ul>
          <ul className="form-inline ml-auto" style={{paddingLeft:"669px", marginTop: "13px"}}>
                  <form>
                      <input
                          className="form-control mr-sm-0"
                          type="text"
                          aria-label="Search"
                          placeholder="Search"
                          value={this.input}

                             onChange={(event: SyntheticInputEvent<HTMLInputElement>) =>{(this.input = event.target.value)}}/>

                      <button
                          className="btn btn-success text-white"
                          type="submit"
                          onClick={this.search}>Search</button>

                  </form>
          </ul>
      </nav>
    </div>;
  }
  mounted() {
    categoryService.getCategory().then(cat => this.categorys = cat).catch(error => error.message);
  }

    search(){
      history.push('/search/'+ this.input);
    }
}


export class SearchOutput extends Component <{match: {params: {search: string} }}> {
    articles: Artikkel[] = [];
    render(){
        return (
            <div className="">
                <Row>
                    {this.articles.map(art => (
                        <LayoutPaper
                            header ={art.overskrift}
                            to={'/artikler/' + art.id_a}
                            key={art.id_a}
                            alt={art.alt}
                            bilde={art.bilde}>
                        </LayoutPaper>
                    ))}
                </Row>
            </div>

        );
    }
    mounted() {
        if (this.props.match.params.search) {
            artikkelservice.searchCases(this.props.match.params.search).then(response => {
                this.articles = [];
                response.map(r => this.articles.push(r));
            })
                .catch(error => console.error(error.message));
        }
    }
}



class ShowDate extends Component {
  render() {
    let d = new Date();
    let weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";

    let n = weekday[d.getDay()];
    let date = n + ", " + new Date().toLocaleDateString();
    return (
        <div style={{backgroundColor: 'lightgrey', height:"110%"}}>
        <div id="showDate" >
        {date}
        </div>
        <hr style={{borderTopWidth :"4px", borderTopColor: "lightgrey"}}/>
        </div>
    );
  }
}

class FrontPage extends Component<{ match: { params: { category?: string } } }> {
  artikkel: Artikkel[] = [];
  limNr:number = 5;
  render() {
    return (
    <div>
        <Page>
          {this.artikkel.map(art => (
              <LayoutPaper
                  header ={art.overskrift}
                  to={'/artikler/' + art.id_a}
                  key={art.id_a}
                  alt={art.alt}
                  bilde={art.bilde}>
              </LayoutPaper>
          ))}

        </Page>

    </div>
    )
  }


  mounted()  {
    if(this.props.match.params.category) {
      artikkelservice
          .getCasesCategory(this.props.match.params.category)
          .then(response => {
        this.artikkel = [];
        response.map(r => this.artikkel.push(r));
      }) .catch(error => console.error(error.message));


    } else {
      artikkelservice.getArtikkel().then(response => {
        this.artikkel = [];
        response.map(r => this.artikkel.push(r));
      })
          .catch(error => console.error(error.message));
    }
  }
}



class Relnews extends Component<{ match: { params: { category?: string } } }> {
  artikkel: Artikkel[] = [];
  limNr:number = 5;

  render() {
    return (
        <div>
       <Page>
            {this.artikkel.map(art => (
                      <LayoutPaper
                          header ={art.overskrift}
                          to={'/artikler/' + art.id_a}
                          key={art.id_a}
                          alt={art.alt}
                          bilde={art.bilde}>
                      </LayoutPaper>
            ))}
       </Page>
            <div className={"loadMoreButton"}>
                <Button.Load onClick={this.loadMore}>LoadMore</Button.Load>
            </div>
  </div>

    );
  }

    loadMore() {
        this.limNr += 5;
        artikkelservice.getArtikkelRel(this.limNr).then(response => {
            this.artikkel = [];
            response.map(r => this.artikkel.push(r));
        })
            .catch(error => console.error(error.message));
    }

    mounted()  {
    if(this.props.match.params.category) {
      artikkelservice.getCasesCategory(this.props.match.params.category).then(response => {
        this.artikkel = [];
        response.map(r => this.artikkel.push(r))
      })
    .catch(error => console.error(error.message));
    } else {
      artikkelservice.getArtikkelRel(this.limNr).then(response => {this.artikkel = [];response.map(r => this.artikkel.push(r));}).catch(error => error.message);
    }
  }
}


export class Newsfeed extends Component{
    articles: Artikkel[] = [];
   // articles: Artikkel[] = [];

  render() {
    return (
        <div style={{backgroundColor: 'whitesmoke', height:"100%"}}>
        <Marquee
            scrollamount="5"
                 element={this.articles}>
          <ul className="newsfeed-list"
              style={{margin:0}}>

          </ul>
        </Marquee>
           <hr style={{borderTopWidth :"9px", borderTopColor: "lightgrey"}} />
        </div>
    );
  }

  mounted() {
    artikkelservice.getNewestArt().then(art => this.articles = art).catch(error => error.message);
  }
}

 export class artikkelSide extends Component<{ match: { params: { id_a: number } } }> {

  // articles: Artikkel[] = [];
  article: Artikkel = new Artikkel('','','','','','','');
  commentList : Comment[]=[];
  comentSend = new CommentSend('', 0,'');
     rateChange :number =0;
     hide: boolean = false;


  render() {
    if (!this.article) return null;
    return (
        <Page>
         <form>
             <CardOnPage>
              <img key={this.article.id_a}
                   src={this.article.bilde}
                   className="imageOnPage"
                   alt={this.article.alt}
                   title={this.article.alt}/>
              <p> Skrevet av: {this.article.forfatter}  {this.article.postTid}</p>
              <div className="frontOverskrift">{this.article.overskrift}</div>
              <div key={this.article.brodtekst} className="sendPost">{this.article.brodtekst}</div>
            <br/>
            <br/>
                 <div className={"editRight"}>
                     <Button.Save onClick={this.edit}>Edit</Button.Save>
                 </div>
             </CardOnPage>

             <CardOnPage>
                 <br/>

             <div className="rateCard" style={{padding: "3%", height: "40%"}}>
                 <div className={"centerTitle"} >{"Please like or dislike this article!"}</div>
                 <Row>
                     <Column>
                         <button className="btn"
                                 hidden={this.hide}
                                 onClick={() => {
                             this.rateChange = 1;
                             this.rate();
                         }}>
                             <img className={"Heart"}  src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Love_Heart_SVG.svg/968px-Love_Heart_SVG.svg.png"/>
                         </button>
                     </Column>
                     <Column>
                         <button className="btn" hidden={this.hide}  onClick={() => {
                             this.rateChange = -1;
                             this.rate();
                         }}>
                             <img className={"brokenHeart"} src="https://mediad.publicbroadcasting.net/p/khpr/files/styles/x_large/public/201902/broken_heart.png"/>
                         </button>
                     </Column>
                 </Row>
                 <div className={"centerTitle"}>
                     {"Likes: "+ this.article.rate}
                 </div>
             </div>
        <hr/>

        <div className={"comment"}>Nickname</div>
             <Column>
                 <input
                     className={"commentPlacholder"}
                     placeholder={"Enter a Nickname:"}
                     type="text"
                     value={this.comentSend.nickname}
                     onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                         if (this.comentSend) this.comentSend.nickname = event.target.value;
                     }}
                 />
             </Column>

                 <br/>

                  <div className="comment">Comment:</div>
                  <Column>
                <textarea
                    className={"commentPlacholder"}
                    placeholder={"Enter a comment:"}
                    rows="10"
                    cols="60"
                    id="Post"
                    key={"textarea"}
                    type="text"
                  onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                    if (this.comentSend) this.comentSend.comment = event.target.value;
                    if (this.comentSend) this.comentSend.id_a = this.article.id_a;
                  }}/>
                  </Column>


        <div  className={"comment"}>
          <Button.Save onClick={this.send}>Save</Button.Save>
        </div>
             <br/>
             </CardOnPage>

         <CardOnPage>
          <div className="comments">
              <br/>
            Comments:
              <hr/>
          </div>
                  <div>
                    {this.commentList.map(com =>
                      <div key={com.comment + com.nickname}>
                        <br/>
                          <div  key={com.nickname +"nickname"} className="nickname">- {com.nickname} </div>
                          <div key={com.comment +"com"} className="artBrodtekst" > {""}{com.comment}</div>
                          <hr style={{borderTopWidth :"10px", borderTopColor: "lightgrey", paddingLeft: "0"}}/>
                      </div>
                    )}
                  </div>
         </CardOnPage>
         <br/>
          <br/>
             </form>
        </Page>


    );
  }


    edit() {
      history.push('/artikler/' + this.article.id_a + '/edit')

    }
    send() {

      if (!this.comentSend) return null;
      commentService.postComment(this.comentSend)
          .then(() => {
            if(this.comentSend)  window.location.reload();
          })
          .catch((error: Error) => Alert.danger(error.message));

    }

     rate() {
         artikkelservice.updateRate(this.props.match.params.id_a, this.rateChange).then(() => {
             this.hide = true;
             this.mounted()
         });
     }

         mounted() {
    artikkelservice.getArticleId(this.props.match.params.id_a).then(article => (this.article = article[0])).catch((error: Error) => Alert.danger(error.message));
    commentService.getComment(this.props.match.params.id_a).then(response => {this.commentList = [];response.map(r => this.commentList.push(r));

    });
  }
}


class NewsEdit extends Component<{ match: { params: { id_a: number } } }> {
  categorys: Category[] =[];
  article = new Artikkel('','','','','','','',);


  render() {
    if (!this.article) return null;

    return (
  <div className="container">
    <div className="row justify-content-center">
        <Card title="Edit">
          <form>
            <div>
              <Column width={5} >Kategori </Column>
              <Column>
                <select id="select" value={this.article.navnPost} onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                  if (this.article) this.article.navnPost = event.target.value;
                }}>

                  <option hidden value={""} defaultValue="default" >Choose category</option>
                  <option key={this.article.navnPost} value={"News"}>News</option>
                  {this.categorys.map(c => (
                      <option key={c.navn} value={c.navn}>{c.navn}</option>
                  ))}
                </select>


              </Column>
            </div>

              <Column width={5}>Overskrift</Column>
              <Column>
                <input
                    type="text"
                    value={this.article.overskrift}
                    onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                      if (this.article) this.article.overskrift = event.target.value;
                    }}
                />
              </Column>


              <Column width={5}>Brødtekst</Column>
              <Column>
                <textarea
                    cols="60"
                    rows="7"
                    type="text"
                    value={this.article.brodtekst}
                    onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                      if (this.article) this.article.brodtekst = event.target.value;
                    }}
                />
              </Column>


              <Column width={5}>Bilde URL</Column>
              <Column>
                  <input
                      type="text"
                      value={this.article.bilde}
                      onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                          if (this.article) this.article.bilde = event.target.value;
                      }}
                  />
              </Column>

              <Column width={5}>alt</Column>
              <Column>
                  <input
                      type="text"
                      value={this.article.alt}
                      onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                          if (this.article) this.article.alt = event.target.value;
                      }}
                  />
              </Column>


            <Column width={5}>Relevanse</Column>
            <Column>
              <select value={this.article.relevanse} onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                        if (this.article) this.article.relevanse = event.target.value;
              }}>

                <option hidden value={""}>Choose priority</option>
                <option key={"1"} value={1}>1</option>
                <option key={"2"} value={2}>2</option>
              </select>
            </Column>

            <br></br>


            <Button.Save className="Btn-save"  onClick={this.save} >Save</Button.Save>
            <Button.Danger className="Btn-delete" onClick={(e) => { if (window.confirm('Are you sure you wish to delete this article?')) this.delete()}}>
                Delete
            </Button.Danger>

          </form>
        </Card>
    </div>
  </div>
    );
  }

  mounted() {
    artikkelservice.getArticleId(this.props.match.params.id_a).then(article => (this.article = article[0])).catch((error: Error) => Alert.danger(error.message));
    categoryService.getCategory().then(cat => this.categorys = cat).catch(error => error.message);
  }

  delete(){
    if(!this.article) return null;

    artikkelservice.removeArticle(this.article.id_a).then(() => {
          if (this.article) history.push('/');
        })
        .catch((error: Error) => Alert.danger(error.message));
  }

  save() {
    if (!this.article) return null;
    artikkelservice.updateArticle(this.article, this.article.id_a).then(() => {
      if (this.article) history.push('/artikler/' + this.article.id_a);
        }).catch((error: Error) => Alert.danger(error.message));
  }
}

class Footer extends Component{
    render() {
        return (
            <div className="bg-dark text-white Footer" >
                <p>Thank you for reading this paper! </p>
                <p>Contact:--------</p>
            </div>
        );
    }
}



const root = document.getElementById('root');
if (root)
  ReactDOM.render(
      <HashRouter>
        <div>
          <Alert />
          <Navbar/>
          <ShowDate/>


          <Route exact path="/" component={FrontPage} />

          <Route exact path="/rel" component={Newsfeed} />
          <Route exact path="/rel" component={Relnews} />

          <Route exact path="/category/:category" component={FrontPage} />

          <Route exact path="/add" component={LeggTil} />
          <Route exact path="/artikler/:id_a" component={artikkelSide} />
          <Route exact path="/artikler/:id_a/edit" component={NewsEdit} />
          <Route exact path="/search/:search" component={SearchOutput}/>


            <Footer/>
        </div>
      </HashRouter>,
      root
  );




