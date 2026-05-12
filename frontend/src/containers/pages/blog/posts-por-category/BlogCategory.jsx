
import Header from "../../../../components/blog/Header";
import BlogListCategory from "../../../../components/blog/BlogListCategory";
import { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { get_blog_list_category, get_blog_list_category_page } from "../../../../redux/actions/blog";
import FullWidthLayout from "../../../../hocs/FullWidthLayout";






function BlogCategory({
    get_blog_list_category,
    blog_list_category, 
    get_blog_list_category_page,
    count, 
    next,
    previous,
  
}){
    
    const params = useParams()
    const categorySlug = params.categorySlug 
    console.log(categorySlug)
    useEffect(() => {
        get_blog_list_category(categorySlug);
    }, [categorySlug]);


        /**SEO */
      {/**SEO */}

useEffect(() => {
    if (categorySlug) {
      // 1. Título con palabras clave (Keywords)
      document.title = `${post.title} | Jovamna Medina - Full Stack Django & React`;

      // 2. Descripción técnica para Google
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.name = 'description';
        document.head.appendChild(metaDescription);
      }
      // Combinamos el título del post con tus habilidades principales
      metaDescription.content = `${post.title}. Articulo de Jovamna Medina, Full Stack Developer experta en Django, React y Redux.`;

      // 3. Meta tags: Open Graph y Twitter
      const metaTags = [
        { property: 'og:title', content: `${post.title} | Jovamna Medina - Dev Django/React` },
        { property: 'og:description', content: `Explora este post de Jovamna Medina, especialista en desarrollo Full Stack con Django, React y Redux.` },
        { property: 'og:image', content: post.image || 'https://www.jovamnamedina.com/og-image-tech.png' },
        { property: 'og:type', content: 'article' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:label1', content: 'Tech Stack' }, // Dato extra para Twitter
        { name: 'twitter:data1', content: 'Django, React, Redux, PostgreSQL' }
      ];

      metaTags.forEach(({ property, name, content }) => {
        const attribute = property ? `meta[property="${property}"]` : `meta[name="${name}"]`;
        let metaTag = document.querySelector(attribute);
        if (!metaTag) {
          metaTag = document.createElement('meta');
          if (property) metaTag.setAttribute('property', property);
          if (name) metaTag.setAttribute('name', name);
          document.head.appendChild(metaTag);
        }
        metaTag.content = content || '';
      });

      // 4. JSON-LD (Esto le fascina a Google)
      let scriptJsonLd = document.querySelector('script[data-schema="blog-post"]');
      if (!scriptJsonLd) {
        scriptJsonLd = document.createElement('script');
        scriptJsonLd.type = 'application/ld+json';
        scriptJsonLd.setAttribute('data-schema', 'blog-post');
        document.head.appendChild(scriptJsonLd);
      }

      scriptJsonLd.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        'headline': post.title,
        'author': {
          '@type': 'Person',
          'name': 'Jovamna Medina',
          'jobTitle': 'Full Stack Developer',
          'knowsAbout': ['Django', 'React', 'Redux', 'Python', 'JavaScript', 'SQL'] // <-- ¡Esto es SEO puro!
        },
        'publisher': {
          '@type': 'Organization',
          'name': 'Jovamna Medina Dev',
          'logo': {
            '@type': 'ImageObject',
            'url': 'https://www.jovamnamedina.com/logo.png'
          }
        },
        'mainEntityOfPage': {
          '@type': 'WebPage',
          '@id': `https://www.jovamnamedina.com/blog/post/${post.slug}`
        }
      });
    }
  }, [post]);


{/**FIN SEO */}






    return(
        <>
        <FullWidthLayout>
        <div>
           
            </div>



            <Header/>
            <BlogListCategory 
            get_blog_list_category_page={get_blog_list_category_page} 
            list_categories_blog={blog_list_category} 
            categorySlug={categorySlug} // Pasar el categorySlug como prop
            count={count&&count} 
            />
         
      </FullWidthLayout>
            </>
        )
}

const mapStateToProps = state => ({
    list_categories_blog: state.blog.blog_list_category,
    count: state.blog.count,
    next: state.blog.next,
    previous: state.blog.previous,

})

export default connect(mapStateToProps,{
    get_blog_list_category,
    get_blog_list_category_page
})(BlogCategory)

