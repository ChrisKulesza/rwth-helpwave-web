import Link from 'next/link'
import { tw } from '@helpwave/common/twind'

const socials = [
  { name: 'GitHub', link: 'https://github.com/helpwave/' },
  { name: 'LinkedIn', link: 'https://linkedin.com/company/helpwave/' },
  { name: 'Instagram', link: 'https://instagram.com/helpwave_de/' },
  { name: 'Twitter', link: 'https://twitter.com/helpwave_org' },
  { name: 'YouTube', link: 'https://www.youtube.com/@helpwave' },
  { name: 'Twitch', link: 'https://www.twitch.tv/helpwave' },
  { name: 'Spotify', link: 'https://open.spotify.com/show/7oRRTH65cGS5yvvcX8XXOb' },
]

const Footer = () => {
  return (
      <div className={tw('w-screen absolute left-1/2 bottom-[40px] -translate-x-1/2')}>
        <div className={tw('flex flex-wrap gap-8 justify-center')}>
          {socials.map(({ name, link }) => (
            <div key={link} className={tw('group')}>
              <Link target="_blank" href={link} className={tw('py-1')}>{name}</Link>
              <div className={tw('mx-auto mt-1 h-[3px] w-[80%] bg-transparent group-hover:bg-current')} />
            </div>
          ))}
        </div>
    </div>
  )
}

export default Footer