/* jce - 2.6.7.1 | 2017-01-18 | http://www.joomlacontenteditor.net | Copyright (C) 2006 - 2017 Ryan Demmer. All rights reserved | GNU/GPL Version 2 or later - http://www.gnu.org/licenses/gpl-2.0.html */
!function(){tinymce.create("tinymce.plugins.WordCount",{block:0,id:null,countre:null,cleanre:null,init:function(ed,url){function checkKeys(key){return key!==last&&(key===VK.ENTER||last===VK.SPACEBAR||checkDelOrBksp(last))}function checkDelOrBksp(key){return key===VK.DELETE||key===VK.BACKSPACE}var t=this,last=0,VK=tinymce.VK;t.countre=ed.getParam("wordcount_countregex",/[\w\u2019\u00co-\u00ff^\uc397^u00f7\'-]+/g),t.cleanre=ed.getParam("wordcount_cleanregex",/[0-9.(),;:!?%#$?\'\"_+=\\\/-]*/g),t.update_rate=ed.getParam("wordcount_update_rate",2e3),t.update_on_delete=ed.getParam("wordcount_update_on_delete",!1),t.id=ed.id+"-word-count",ed.onWordCount=new tinymce.util.Dispatcher(t),ed.onPostRender.add(function(ed,cm){var row,id;id=ed.getParam("wordcount_target_id"),id?tinymce.DOM.add(id,"span",{},'<span id="'+t.id+'">0</span>'):(row=tinymce.DOM.get(ed.id+"_path_row"),row&&tinymce.DOM.add(row.parentNode,"div",{style:"float: right"},ed.getLang("wordcount.words","Words: ")+'<span id="'+t.id+'">0</span>'))}),ed.onInit.add(function(ed){ed.selection.onSetContent.add(function(){t._count(ed)}),t._count(ed)}),ed.onSetContent.add(function(ed){t._count(ed)}),ed.onKeyUp.add(function(ed,e){(checkKeys(e.keyCode)||t.update_on_delete&&checkDelOrBksp(e.keyCode))&&t._count(ed),last=e.keyCode})},_getCount:function(ed){var tc=0,tx=ed.getContent({format:"raw"});if(tx){tx=tx.replace(/\.\.\./g," "),tx=tx.replace(/<.[^<>]*?>/g," ").replace(/&nbsp;|&#160;/gi," "),tx=tx.replace(/(\w+)(&.+?;)+(\w+)/,"$1$3").replace(/&.+?;/g," "),tx=tx.replace(this.cleanre,"");var wordArray=tx.match(this.countre);wordArray&&(tc=wordArray.length)}return tc},_count:function(ed){var t=this,limit=parseInt(ed.getParam("wordcount_limit",0));t.block||(t.block=1,setTimeout(function(){if(!ed.destroyed){var tc=t._getCount(ed);tinymce.DOM.setHTML(t.id,tc.toString()),limit&&(tc-limit>0?tinymce.DOM.addClass(t.id,"wordcount_limit"):tinymce.DOM.removeClass(t.id,"wordcount_limit")),ed.onWordCount.dispatch(ed,tc),setTimeout(function(){t.block=0},t.update_rate)}},1))},getInfo:function(){return{longname:"Word Count plugin",author:"Moxiecode Systems AB",authorurl:"http://tinymce.moxiecode.com",infourl:"http://wiki.moxiecode.com/index.php/TinyMCE:Plugins/wordcount",version:tinymce.majorVersion+"."+tinymce.minorVersion}}}),tinymce.PluginManager.add("wordcount",tinymce.plugins.WordCount)}();