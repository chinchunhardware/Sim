/*================================================
  CHIN CHUN HARDWARE
  CHUA KOK SIM DIGITAL BUSINESS CARD
================================================*/


/* -----------------------------------------
   DIGITAL CARD URL
----------------------------------------- */

const CARD_URL =
    "https://chinchunhardware.github.io/Sim/";


/* -----------------------------------------
   CONTACT INFORMATION
----------------------------------------- */

const contact = {

    firstName:
        "Kok Sim",

    lastName:
        "Chua",

    fullName:
        "Chua Kok Sim",

    company:
        "Chin Chun Hardware",

    phone:
        "+60126763999",

    email:
        "cc_hardware@hotmail.com",

    website:
        "https://www.chinchunhardware.my"

};


/* -----------------------------------------
   SAVE CONTACT
----------------------------------------- */

const saveButton =
    document.getElementById("saveContact");


if (saveButton) {

    saveButton.addEventListener(
        "click",
        function(event) {

            event.preventDefault();


            const vCard = [

                "BEGIN:VCARD",

                "VERSION:3.0",

                "N:Chua;Kok Sim;;;",

                "FN:Chua Kok Sim",

                "ORG:Chin Chun Hardware",

                "TEL;TYPE=CELL:+60126763999",

                "EMAIL;TYPE=WORK:cc_hardware@hotmail.com",

                "URL:https://www.chinchunhardware.my",

                "END:VCARD"

            ].join("\r\n");


            const blob =
                new Blob(
                    [vCard],
                    {
                        type:
                            "text/vcard;charset=utf-8"
                    }
                );


            const url =
                URL.createObjectURL(blob);


            const link =
                document.createElement("a");


            link.href =
                url;


            link.download =
                "Chua_Kok_Sim.vcf";


            document.body.appendChild(
                link
            );


            link.click();


            document.body.removeChild(
                link
            );


            setTimeout(
                function() {

                    URL.revokeObjectURL(
                        url
                    );

                },
                1000
            );


            haptic();

        }
    );

}


/* -----------------------------------------
   SHARE DIGITAL BUSINESS CARD
   URL ONLY
----------------------------------------- */

const shareButton =
    document.getElementById("shareButton");


if (shareButton) {

    shareButton.addEventListener(
        "click",
        async function() {


            /*
             IMPORTANT:

             Do NOT add:

             title:
             text:

             Only share the URL.
            */

            const shareData = {

                url:
                    CARD_URL

            };


            try {


                /* ==========================
                   NATIVE SHARE
                ========================== */

                if (
                    navigator.share
                ) {

                    await navigator.share(
                        shareData
                    );

                }


                /* ==========================
                   FALLBACK
                ========================== */

                else {

                    await copyCardLink();

                }


                haptic();

            }


            catch (error) {


                /*
                 User cancelled sharing.
                */

                if (
                    error.name !==
                    "AbortError"
                ) {

                    console.log(
                        "Share failed:",
                        error
                    );

                }

            }

        }
    );

}


/* -----------------------------------------
   COPY DIGITAL CARD LINK
----------------------------------------- */

async function copyCardLink() {

    try {

        await navigator.clipboard.writeText(
            CARD_URL
        );


        showMessage(
            "Digital card link copied"
        );

    }

    catch (error) {

        showMessage(
            CARD_URL
        );

    }

}


/* -----------------------------------------
   TOAST MESSAGE
----------------------------------------- */

function showMessage(message) {


    const existing =
        document.querySelector(
            ".toast-message"
        );


    if (existing) {

        existing.remove();

    }


    const toast =
        document.createElement(
            "div"
        );


    toast.className =
        "toast-message";


    toast.textContent =
        message;


    toast.style.position =
        "fixed";


    toast.style.left =
        "50%";


    toast.style.bottom =
        "25px";


    toast.style.transform =
        "translateX(-50%)";


    toast.style.zIndex =
        "9999";


    toast.style.padding =
        "12px 20px";


    toast.style.borderRadius =
        "18px";


    toast.style.background =
        "rgba(0,0,0,.78)";


    toast.style.backdropFilter =
        "blur(15px)";


    toast.style.webkitBackdropFilter =
        "blur(15px)";


    toast.style.color =
        "#ffffff";


    toast.style.fontSize =
        "14px";


    toast.style.fontWeight =
        "600";


    toast.style.whiteSpace =
        "nowrap";


    document.body.appendChild(
        toast
    );


    setTimeout(
        function() {

            toast.remove();

        },
        2200
    );

}


/* -----------------------------------------
   HAPTIC FEEDBACK
----------------------------------------- */

function haptic() {

    if (
        "vibrate" in navigator
    ) {

        navigator.vibrate(30);

    }

}


/* -----------------------------------------
   BUTTON PRESS ANIMATION
----------------------------------------- */

document
    .querySelectorAll("a, button")
    .forEach(
        function(button) {


            button.addEventListener(
                "click",
                function() {


                    button.animate(

                        [

                            {
                                transform:
                                    "scale(1)"
                            },

                            {
                                transform:
                                    "scale(.96)"
                            },

                            {
                                transform:
                                    "scale(1)"
                            }

                        ],

                        {

                            duration:
                                180,

                            easing:
                                "ease-out"

                        }

                    );

                }
            );

        }
    );


/* -----------------------------------------
   CARD ENTRANCE ANIMATION
----------------------------------------- */

window.addEventListener(
    "load",
    function() {


        const card =
            document.querySelector(
                ".card"
            );


        if (!card) {

            return;

        }


        card.animate(

            [

                {
                    opacity:
                        0,

                    transform:
                        "translateY(20px)"
                },

                {
                    opacity:
                        1,

                    transform:
                        "translateY(0)"
                }

            ],

            {

                duration:
                    700,

                easing:
                    "ease-out",

                fill:
                    "forwards"

            }

        );

    }
);


/* -----------------------------------------
   PRELOAD IMAGES
----------------------------------------- */

window.addEventListener(
    "load",
    function() {


        const images = [

            "logo.png",

            "profile.jpg",

            "preview.jpg",

            "apple-touch-icon.png"

        ];


        images.forEach(
            function(source) {


                const image =
                    new Image();


                image.src =
                    source;

            }
        );

    }
);


/* -----------------------------------------
   SERVICE WORKER / PWA
----------------------------------------- */

if (
    "serviceWorker" in navigator
) {

    window.addEventListener(
        "load",
        function() {


            navigator.serviceWorker
                .register("sw.js")

                .then(
                    function() {

                        console.log(
                            "Service Worker registered"
                        );

                    }
                )

                .catch(
                    function(error) {

                        console.log(
                            "Service Worker registration failed:",
                            error
                        );

                    }
                );

        }
    );

}


/* -----------------------------------------
   PREVENT DOUBLE-TAP ZOOM
----------------------------------------- */

let lastTouchEnd =
    0;


document.addEventListener(
    "touchend",
    function(event) {


        const now =
            Date.now();


        if (
            now - lastTouchEnd <= 300
        ) {

            event.preventDefault();

        }


        lastTouchEnd =
            now;

    },
    {
        passive: false
    }
);
