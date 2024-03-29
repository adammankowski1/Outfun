$(document).ready(function(){

    if($('form').hasClass('dropzone'))
    {
        Dropzone.autoDiscover = false;
        var myDropzone = new Dropzone(".dropzone", {
            autoProcessQueue: false,
            uploadMultiple: true,
            parallelUploads: 100,
            maxFiles: 4,
            parallelUploads: 4,
            //addRemoveLinks: true,
            previewsContainer: ".slider",
            clickable: ".fileinput-button",
            init: function() {
                this.on("addedfile", function(file) {
                    $('.slider').slick('slickAdd',file.previewElement);;
                });

                document.querySelector("span.addPost").addEventListener("click", function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    myDropzone.processQueue();
                });
            }
        });
    }

    $('.slider').slick({
        dots: true,
        infinite: false,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 4,
        variableWidth: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });

    $('.photo-preview').slick({
        dots: true,
        infinite: true,
        speed: 500,
        fade: true,
        adaptiveHeight: true,
        cssEase: 'linear'
    });

    $.ajaxSetup(
    {
        headers:
        {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    $('button.thumb-up-button').click(function(e) {
        var self = this;
        var task_id = $(self).attr('value');
        var callback = function ($message) {
            switch($message) {
                case "liked":
                    $(self).focus();
                    break;
                case "unliked":
                    $(self).blur();
                    $(self).removeClass("focus");
                    break;
                default:
                    console.log("unkown");
            }
        };
        sendRequest("post", "like", task_id, callback);
        //Prevent default action (scrooling to specified element for example)
        e.preventDefault();
    });

    function sendRequest(action, subaction, id, callback) {
        $.ajax({
            type: "POST",
            dataType : 'json',
            url: "/" + action + "/" + id + "/" + subaction,
            success: function (data) {
                callback(data['message']);
                //alert(data['message']);
            },
            error: function (data) {
                console.log('Error:', data);
                alert("coś poszło nie tak");
            }
        });
    }
});
