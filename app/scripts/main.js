// jshint devel:true
'use strict';

var app = app || {};

app.newList = function(jQueryLi, jQuery) {
    return {
        clear: function() {
            jQueryLi.empty();
        },
        setItems: function(items) {
            var i;
            for (i = 0; i < items.length; i++) {
                jQueryLi.append(jQuery('<li>' + items[i] + '</li>'));
            }
        }
    };
};

app.newMain = function(getMainInputText, list) {
    return {
        resetList: function(items) {
            list.clear();
            list.setItems(items);
        },
        onMainInputChange: function() {
            var i,
                each,
                first,
                isAtEndOfWord,
                matched = [],
                inputText = getMainInputText();

            if (inputText.length === 0) {
                return;
            }

            for (i = 0; i < app.words.length; i++) {
                each = app.words[i];
                first = each.lastIndexOf(inputText);
                isAtEndOfWord = first === (each.length - inputText.length);
                if (first >= 0 && isAtEndOfWord) {
                    matched.push(each);
                }
            }

            this.resetList(matched);
        }
    };
};

app.newDelayedChangeEvent = function(
    delayInMs,
    listener,
    setTimeout,
    clearTimeout) {

    var last = null;

    return {
        onChange: function(event) {
            if (last !== null) {
                clearTimeout(last);
            }
            last = setTimeout(
                function() {
                    listener.onMainInputChange(event);
                },
                delayInMs);
        }
    };
};

/*global $*/
$(document).ready(function() {
    var list = app.newList($('#matchList'), $),
        main = app.newMain(function() {
            return $('#mainInput').val().trim().toLowerCase();
        }, list),
        delayedChangeEvent = app.newDelayedChangeEvent(
            400,
            main,
            setTimeout,
            clearTimeout);

    $('#mainInput').on('change keyup paste cut', delayedChangeEvent.onChange);
});
