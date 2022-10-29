/* eslint-disable @next/next/no-img-element */
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const Home = () => {

  const { data: session } = useSession();

  return (
    <div className='flex flex-col items-center'>
      <Navbar />
      <div className="w-full h-full lg:h-[700px] xl:h-full overflow-auto">
        <video playsInline autoPlay muted loop>
          <source src="/videos/preview.webm" type="video/webm" />
          <source src="/videos/preview.mp4" type="video/mp4" />
        </video>
      </div>
      <div className='p-2'>
        <h2 className='font-medium text-2xl font-poppins mb-2 hover:text-3xl transition-all ease-in-out'>what is r/place?</h2>
        <p className='font-poppins text-sm'>
          r/place was a collaborative project and social experiment hosted on the social networking site Reddit on April Fools Day 2017 and repeated again
          on April Fools Day 2022. The 2017 experiment involved an online canvas located at a subreddit called r/place,
          which registered users could edit the canvas by changing the color of a single pixel with a replacement from a 16-color palette.
          After each pixel was placed, a timer prevented the user from placing any more pixels for a period of time varying from 5 to 20 minutes.
          The idea of the experiment was conceived by Josh Wardle. The experiment was ended by Reddit administrators about 72 hours after its creation,
          on 3 April 2017. Over 1 million users edited the canvas, placing a total of approximately 16 million pixels, and, at the time the experiment was ended,
          over 90,000 users were actively viewing or editing the canvas. The experiment was commended for its representation of the culture of Reddit online communities, and of Internet culture as a whole.
          On 1 April 2022, Reddit began a reboot of the experiment that lasted for four days.
        </p>
      </div>
      <Footer />
    </div>
  )

}

export default Home
