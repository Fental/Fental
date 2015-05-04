/**
 * Created by T on 2015/4/7.
 */
window.onload = function(){
    emojify.setConfig({
        emoticons_enabled: true,
        people_enabled: true,
        nature_enabled: true,
        img_dir:"http://fental.github.io/Fental/images/emoji"
    });
    emojify.run();
};