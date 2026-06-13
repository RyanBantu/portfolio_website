import { motion } from 'framer-motion'
import {
  teaching,
  guestLecturePhotos,
  communityTeachingPhoto,
  manipalWorkshopPhotos,
} from '../../data/resume'
import { staggerContainer, staggerItem } from '../../motion'
import { SectionShell } from '../layout/SectionShell'
import './TeachingSection.css'

const stories = [
  {
    id: 'guest',
    label: 'Guest Lecture',
    venue: 'Infosys · Bangalore',
    text: teaching[0],
    photos: guestLecturePhotos,
    reverse: false,
  },
  {
    id: 'community',
    label: 'Community Outreach',
    venue: 'Rajpet · BOC Society',
    text: teaching[1],
    photos: [communityTeachingPhoto],
    reverse: true,
  },
  {
    id: 'manipal',
    label: 'Workshops',
    venue: 'Manipal · School programs',
    text: teaching[2],
    photos: manipalWorkshopPhotos,
    reverse: false,
  },
]

export function TeachingSection() {
  return (
    <SectionShell
      id="teaching"
      index="09"
      title="Teaching"
      subtitle="Guest lectures, community programs, and hands-on workshops"
      variant="editorial"
    >
      <div className="outreach">
        {stories.map((story, storyIdx) => (
          <motion.article
            key={story.id}
            className={`outreach__story ${story.reverse ? 'outreach__story--reverse' : ''}`}
            initial={{ opacity: 0, y: 56 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.8, delay: storyIdx * 0.05, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="outreach__media">
              <motion.div
                className="outreach__gallery"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {story.photos.map((ph, i) => (
                  <motion.figure
                    key={ph.src}
                    className={`outreach__frame outreach__frame--${i}`}
                    variants={staggerItem}
                    whileHover={{ scale: 1.02, zIndex: 2 }}
                    transition={{ type: 'spring', stiffness: 280, damping: 24 }}
                  >
                    <img src={ph.src} alt={ph.alt} loading="lazy" decoding="async" />
                    {'caption' in ph && ph.caption ? (
                      <figcaption>{ph.caption}</figcaption>
                    ) : null}
                  </motion.figure>
                ))}
              </motion.div>
            </div>

            <div className="outreach__panel">
              <div className="outreach__panel-inner">
                <span className="outreach__label">{story.label}</span>
                <span className="outreach__venue">{story.venue}</span>
                <p className="outreach__text">{story.text}</p>
              </div>
            </div>
          </motion.article>
        ))}

        <motion.div
          className="outreach__extras"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {teaching.slice(3).map((note, i) => (
            <motion.blockquote key={note} className="outreach__quote" variants={staggerItem}>
              <span className="outreach__quote-num">{String(i + 1).padStart(2, '0')}</span>
              <p>{note}</p>
            </motion.blockquote>
          ))}
        </motion.div>
      </div>
    </SectionShell>
  )
}
