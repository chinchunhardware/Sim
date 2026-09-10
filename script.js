/* -----------------------------------------
   SHARE DIGITAL BUSINESS CARD
----------------------------------------- */

const shareButton =
    document.getElementById("shareButton");


if (shareButton) {

    shareButton.addEventListener(
        "click",
        async function() {

            const shareData = {

                title:
                    "Chua Kok Sim | Chin Chun Hardware",

                url:
                    CARD_URL

            };


            try {

                if (
                    navigator.share
                ) {

                    await navigator.share(
                        shareData
                    );

                }

                else {

                    await copyCardLink();

                }


                haptic();

            }

            catch (error) {

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
