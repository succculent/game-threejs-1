export default class Piano
{
    constructor( sample )
    {
        this.audio = new Audio( );
        this.audioCtx = new AudioContext( );
        this.audio.autoplay = false;
        this.audio.src = sample;
        this.audio.loop = false;
        this.source = this.audioCtx.createMediaElementSource( this.audio );
        this.source.connect( this.audioCtx.destination );
    }
    trigger( )
    {
        this.audio.play();
    }
};