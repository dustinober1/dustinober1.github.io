import * as fc from 'fast-check';
import { StructuredDataEngine } from '../../../lib/seo/StructuredDataEngine';

describe('StructuredDataEngine Property Tests', () => {
  const engine = new StructuredDataEngine();

  test('generatePerson produces valid schema structure', () => {
    fc.assert(
      fc.property(
        fc.string(), // name
        fc.string(), // jobTitle
        fc.webUrl(), // url
        fc.array(fc.webUrl()), // sameAs
        (name, jobTitle, url, sameAs) => {
          const person = engine.generatePerson({ name, jobTitle, url, sameAs });
          expect(person['@context']).toBe('https://schema.org');
          expect(person['@type']).toBe('Person');
          expect(person.name).toBe(name);
          expect(person.jobTitle).toBe(jobTitle);
        }
      )
    );
  });

  test('generateArticle produces valid schema structure', () => {
     fc.assert(
        fc.property(
           fc.string(), // headline
           fc.string(), // description
           fc.date({ noInvalidDate: true }), // datePublished
           (headline, description, datePublished) => {
              const article = engine.generateArticle({
                 headline,
                 description,
                 datePublished: datePublished.toISOString(),
                 author: { '@type': 'Person', name: 'Author' }
              });
              expect(article['@type']).toBe('Article');
              expect(article.headline).toBe(headline);
           }
        )
     );
  });
});
