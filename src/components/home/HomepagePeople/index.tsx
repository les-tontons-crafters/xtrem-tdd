import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type PeopleItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const PeopleList: PeopleItem[] = [
  {
    title: 'Programmers',
    Svg: require('@site/static/images/home/undraw_programming_re_kg9v.svg')
      .default,
    description: <>Programmers who lack guidance and mentoring</>,
  },
  {
    title: 'Software Craftsmen',
    Svg: require('@site/static/images/home/undraw_revenue_re_2bmg.svg').default,
    description: (
      <>Aspirant Software Craftsmen keen to learn new practices continuously</>
    ),
  },
  {
    title: 'Coaches',
    Svg: require('@site/static/images/home/undraw_teaching_re_g7e3.svg')
      .default,
    description: (
      <>Technical coaches who want to add tools to their own toolbox</>
    ),
  },
];

function Item({ title, Svg, description }: PeopleItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.itemSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepagePeople(): JSX.Element {
  return (
    <section className={styles.items}>
      <div>
        <Heading as="h1" className="hero__title">
          For who ?
        </Heading>
        <div className="row">
          {PeopleList.map((props, idx) => (
            <Item key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
