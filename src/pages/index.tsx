import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import '@fortawesome/fontawesome-free/css/all.css';
import styles from './index.module.css';
import HomepagePeople from '../components/home/HomepagePeople';
import HomepageValues from '../components/home/HomepageValues';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link className="button button--secondary button--lg" to="/">
            Get Started 🎯
          </Link>
        </div>
      </div>
    </header>
  );
}

function HomepageAbout() {
  return (
    <section>
      <Heading as="h1" className="hero__title">
        About
      </Heading>
      <p>
        <b>Software engineering</b> has been around for decades. Still, we tend
        to constantly spend time <b>investigating problems</b> that were{' '}
        <b>already solved</b> numerous times in the past.{' '}
        <b>We've been there too</b> due to a lack of easy access to reliable
        information. This is precisely the purpose of this website : act as a
        mentor allowing you to find solutions and grow continuously.
      </p>
      <p>
        It aims to provide solutions, ideas and resources to solve problems
        we've observed countless times like :
      </p>
      <p>
        <ul>
          <li>
            I found my test suite being brittle, every change causes dozens of
            tests to fail.
          </li>
          <li>
            I found our understanding of the business being approximate, we
            don't know what should happen in our domain.
          </li>
          <li>
            I found we have a lot of Branches in our processes that throw
            exceptions, it makes it really hard to follow.
          </li>
          <li>
            I found we often violate our Software Architecture principles, it
            creates a lot of tension.
          </li>
          <li>
            I found my tests not providing a reliable output, debugging is
            always mandatory.
          </li>
          <li>And much more...</li>
        </ul>
      </p>
      <p>
        While there can be discussions about choices and preferences, this site
        does not represent the opinion of an individual. It is, in fact, a{' '}
        <b>collective effort</b> from <b>dozens of passionate experts</b>{' '}
        towards the same goal, accumulating more than a hundred years of
        professional experience together.
      </p>
      <p>This site will be the perfect companion for your developer journey.</p>
    </section>
  );
}

function HomepageProposition() {
  return (
    <section>
      <Heading as="h1" className="hero__title">
        Our Value Proposition
      </Heading>
      <img
        src={
          require('@site/static/images/value-proposition-canvas.webp').default
        }
        alt="Image - Value Proposition"
      />
    </section>
  );
}

function HomepageCTA() {
  return (
    <section className={styles.ctaBanner}>
      <div className="container">
        <div className={styles.buttons}>
          <Link className="button button--primary button--lg" to="/">
            Get Started 🎯
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Home(): JSX.Element {
  return (
    <Layout title={`Welcome`} description="Your personal craft mentor">
      <HomepageHeader />
      <main className="container">
        <HomepageAbout />
        <HomepageProposition />
        <HomepagePeople />
        <HomepageValues />
      </main>
      <HomepageCTA />
    </Layout>
  );
}
