import { 
  SchemaPerson, 
  SchemaCreativeWork, 
  SchemaArticle, 
  SchemaOrganization, 
  SchemaContactPoint 
} from './types';

export class StructuredDataEngine {
  
  public generatePerson(data: Omit<SchemaPerson, '@context' | '@type'>): SchemaPerson {
    return {
      '@context': 'https://schema.org',
      '@type': 'Person',
      ...data,
    };
  }

  public generateProject(data: Omit<SchemaCreativeWork, '@context' | '@type'> & { type?: 'CreativeWork' | 'SoftwareApplication' }): SchemaCreativeWork {
    const { type = 'CreativeWork', ...rest } = data;
    return {
      '@context': 'https://schema.org',
      '@type': type,
      ...rest,
    };
  }

  public generateArticle(data: Omit<SchemaArticle, '@context' | '@type'>): SchemaArticle {
    return {
      '@context': 'https://schema.org',
      '@type': 'Article', // Default, could be BlogPosting
      ...data,
    };
  }
  
  public generateOrganization(data: Omit<SchemaOrganization, '@context' | '@type'>): SchemaOrganization {
    return {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      ...data
    };
  }

  public generateContactPoint(data: Omit<SchemaContactPoint, '@context' | '@type'>): SchemaContactPoint {
    return {
      '@context': 'https://schema.org',
      '@type': 'ContactPoint',
      ...data
    }
  }

  public generateBreadcrumbList(items: { name: string; url: string }[]): any {
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url
      }))
    };
  }

  public serialize(schema: any): string {
    return JSON.stringify(schema);
  }
}
