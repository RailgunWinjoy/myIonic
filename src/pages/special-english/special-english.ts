import {Component, NgZone, ViewChild} from '@angular/core';
import { ActionSheet, ActionSheetController, Config, NavController,NavParams } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { VideoPlayer } from '@ionic-native/video-player';
import { ConferenceData } from '../../providers/conference-data';
import {UserData} from "../../providers/user-data";

import {AngularInview} from 'ionicInView';
import {ScreenOrientation} from "@ionic-native/screen-orientation";
import * as $ from 'jquery'
import {CoursePage} from "../course/course";
import {NativeService} from "../../providers/mapUtil";
import {BookControl} from "../../providers/book-control";

@Component({
  selector: 'page-senglish',
  templateUrl: 'special-english.html'
})
export class SpecialEnglishPage {
  @ViewChild ("specengVideo") itroVideoPlayer: any[];

  actionSheet: ActionSheet;


  specialCourses:any = [];

  currentPlayingVideo : any;
  private book_parts: any;

  constructor(
    public actionSheetCtrl: ActionSheetController,
    public navCtrl: NavController,
    public  navParams: NavParams,
    public config: Config,
    public inAppBrowser: InAppBrowser,
    public userData: UserData,
    private screenOrientation: ScreenOrientation,
    public nativeSevice:NativeService,
    public bookControl:BookControl,
    public ngZong: NgZone
    // private videoPlayer: VideoPlayer
  ) {
    // console.log("Passed params", navParams.data);

  }


  clickBook(_specialEnglishBooks){
    console.log("clickBook",_specialEnglishBooks);
    this.book_parts = _specialEnglishBooks.book_name;
  }

  onFullScreen(state) {
      // get current
      // console.log(this.screenOrientation.type); // logs the current orientation, example: 'landscape'
      if(state){
        // Disable orientation lock
        this.screenOrientation.unlock();
        this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
      }else {
        this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
      }
      console.log("fullScreen has end!",this.screenOrientation.type);
    }

  addVideoControl(){
    var self = this;
    $(document).ready(function() {
      var video = $(' #specengVideo');
      console.log("addVideoControl", video)
      video.bind('webkitfullscreenchange mozfullscreenchange fullscreenchange', function (e) {
        var state = document.webkitIsFullScreen;
        var event = state ? 'FullscreenOn' : 'FullscreenOff';
        // Now do something interesting
        console.log('Event: ' + event);
        self.onFullScreen(state);
      });
    });
  }

  gotoSpecialCourse(_specialEnglishBooks){
    console.log("gotoSpecialCourse");
    this.userData.verifyUser(_specialEnglishBooks.book_id,this.userData.userInfo.user_id,this.nativeSevice.getDeviceId()).then( result => {
      if(result){
        // $('#specengVideo').pause()
        this.navCtrl.push(CoursePage,{course:_specialEnglishBooks });
        // $('.video')[0].pause();

        this.pauseVideo();
      }else {

      }

    }).catch( err => {

    })
  }

  findLocation(_specialEnglishBooks){
    console.log("findLocation");
  }

  playVideo(){
    console.log("playVideo");
  }

  lineInView(index:number,inview:boolean, inviewpart:any){
    console.log("lineInView",index);
  }

  ionViewDidEnter(){
    this.addVideoControl();

    this.bookControl.loadCourses().then( (data) => {
      this.specialCourses = this.bookControl.specialCourses;
      this.ngZong.run(()=>{
          this.book_parts =  this.specialCourses[0].book_name
          console.log("init books", this.book_parts )
      })

    })
  }



  segmentChanged(event){

  }

  ionViewDidLeave() {
    this.pauseVideo();

  }

  videoPlayed(specialEnglishBooks:any){

    // if( this.currentPlayingVideo != specialEnglishBooks.index && specialEnglishBooks.index){
    //   let videoPlayer = this.itroVideoPlayer[this.currentPlayingVideo].nativeElement;
    //   videoPlayer.pause();
    // }
    //
    // this.currentPlayingVideo = specialEnglishBooks.index;
    console.log("videoPlayed",specialEnglishBooks);
  }


  pauseVideo(){
    // var video = ;
    // $('#specengVideo').pause();
    // var vid = document.getElementById("specengVideo");
    // vid.pause();
    console.log("pauseVideo",$('.videoPlayer')[0])
    $('.videoPlayer')[0].pause();

    // for(var i=0;i<this.itroVideoPlayer.length;i++){
    //   let videoPlayer = this.itroVideoPlayer[i].nativeElement;
    //   videoPlayer.pause();
    // }
    // console.log("pauseVideo");
  }

  toggleVideo(index) {
    // let videoPlayer = this.itroVideoPlayer[index].nativeElement;
    // videoPlayer.paused ? videoPlayer.play() : videoPlayer.pause();
  }


}
