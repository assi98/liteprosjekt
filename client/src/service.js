//@flow
import axios from "axios";

/*
export class Artikkel {
  id_a: number;
  navnPost: string;
  postTid : string;
  overskrift: string;
  brodtekst: string;
  bilde : string;
  alt: string;
  relevanse: string;
  forfatter: string;

}

 */

export class Artikkel {
  id_a: number;
  navnPost: string;
  postTid: string;
  overskrift: string;
  brodtekst: string;
  bilde : string;
  alt: string;
  relevanse: string;
  forfatter: string;
  rate: number;


  constructor(navnPost: string, overskrift: string, brodtekst: string, bilde: string, alt: string, relevanse: string, forfatter: string) {
    this.navnPost = navnPost;
    this.overskrift = overskrift;
    this.brodtekst = brodtekst;
    this.bilde = bilde;
    this.alt = alt;
    this.relevanse = relevanse;
    this.forfatter = forfatter;
  }
}

export class Category {
  id_c: number;
  navn : string;
}



export class Comment {
  id_com : number;
  comment : string;
  id_a :number;
  nickname : string;
}

export class CommentSend{
  id_com : number;
  comment : string;
  id_a : number;
  nickname : string;

  constructor(comment: string, id_a: number, nickname: string) {
    this.comment = comment;
    this.id_a = id_a;
    this.nickname = nickname;
  }
}


class ArtikkelService {


  searchCases(search: string) {
    return axios.get<Artikkel[]>('/search/' + search).then(response => response.data);
  }

  getArtikkel() {
    return axios.get<Artikkel[]>('/artikler').then(response => response.data);
  }

  getArtikkelRel(limNumb : number){
    return axios.get<Artikkel[]>('/relArtikler/' + limNumb).then(response => response.data);
  }

  getArtikkelLim(limNumb : number){
    return axios.get<Artikkel[]>('/limAnt/' + limNumb).then(response => response.data);
  }

  getArticleId(id_a: number) {
    return axios.get<Artikkel[]>('/artikler/' + id_a).then(response => response.data);
  }

  getCasesCategory(navnPost : string){
    return axios.get<Artikkel[]>('/category/' + navnPost).then(response => response.data);
  }

  postArticle(articleSend: Artikkel) {
    return axios.post('/artikkel', articleSend).then(response => response.data);
  }

  updateArticle(article: Artikkel, id_a : number) {
    return axios.put('/artikler/' + id_a, article).then(response => response.data);
  }
  updateRate(id_a : number, rate: number, ) {
    return axios.put('/rate/'+ id_a +'/' + rate).then(response => response.data);
  }



  removeArticle(id_a: number) {
    commentService.removeAllComment(id_a);
    return axios.delete<Artikkel>('/artikler/' + id_a).then(response => response.data);
  }

  getNewestArt(){
    return axios.get<Artikkel[]>('/newest/').then(response => response.data);
  }

}

class CategoryService {
  getCategory(){
    return axios.get<Category[]>('/category').then(response => response.data);
  }
}

class CommentService{
  removeAllComment(id_a : number){
  return axios.delete<Comment[]>('/comment/' + id_a).then(response => response.data)
  }

  getComment(id_a : number){
    return axios.get<Comment[]>('/comments/' + id_a).then(response => response.data);
  }
  postComment(commentSend : CommentSend){
    return axios.post('/comment', commentSend).then(response => response.data);
  }

}

export let commentService = new CommentService();
export let artikkelservice = new ArtikkelService();
export let categoryService = new CategoryService();