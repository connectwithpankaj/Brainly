import ShareIcon from "../Icons/ShareIcon";

interface CardProps {
  title: string;
  link: string;
  type: "twitter" | "youtube";
}

function Card({ title, link, type }: CardProps) {
  return (
    <div>
      <div className="p-6 bg-white rounded-md border-gray-250 max-w-72 border min-h-48">
        <div className="flex justify-between">
          <div className="flex items-center text-md ">
            <div className="text-gray-500 pr-2 ">
              <ShareIcon />
            </div>
            {title}
          </div>
          <div className="flex">
            <div className="text-gray-500 pr-2 ">
              <a href={link} target="_blank">
                <ShareIcon />
              </a>
            </div>
            <div className="text-gray-500 ">
              <ShareIcon />
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex pt-8">
          {type === "youtube" && (
            <iframe
              className="w-full"
              width="860"
              height="400"
              src={link}
              title="Zor Ka Jhatka Full HD Song Action Replayy"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          )}
          {type === "twitter" && (
            <div className="twitter-embed">
              <blockquote className="twitter-tweet">
                <p lang="en" dir="ltr">
                  Today I explored Recoil in React and although it was confusing
                  at first - I finally gained some handson experience and good
                  understanding. Huge thanks to{" "}
                  <a href="https://twitter.com/kirat_tw">@kirat_tw</a> and{" "}
                  <a href="https://twitter.com/100xDevs">@100xDevs</a> for
                  making it click! �{" "}
                  <a href="https://twitter.com/hashtag/React">#React</a>{" "}
                  <a href="https://twitter.com/hashtag/Recoil">#Recoil</a>{" "}
                  <a href="https://twitter.com/hashtag/100xDevs">#100xDevs</a>{" "}
                  <a href="https://twitter.com/hashtag/kirat_tw">#kirat_tw</a>{" "}
                  <a href="https://t.co/zowonQR1N6">
                    pic.twitter.com/zowonQR1N6
                  </a>
                </p>
                &mdash; Pankaj (@pankaj_sgh){" "}
                <a href={link}>
                  May 10, 2025
                </a>
              </blockquote>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Card;
