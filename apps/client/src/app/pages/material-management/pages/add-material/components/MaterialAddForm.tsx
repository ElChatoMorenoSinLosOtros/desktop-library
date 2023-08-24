import { Form, Formik } from 'formik';
import MaterialFormTextField from '../../components/MaterialFormTextField';

function MaterialAddForm() {
  return (
    <Formik
      initialValues={{
        title: '',
        author: '',
        category: '',
        materialType: '',
        publicationYear: '',
        pageCount: '',
        isbn: ''
      }}
      onSubmit={() => {}}
    >
      <Form className='mx-2 grid grid-cols-2 gap-16'>
        <MaterialFormTextField
          title='Title'
          name='title'
          placeholder='Enter your Email'
          type='text'
        />
        <MaterialFormTextField
          title='Author'
          name='author'
          placeholder='Enter your author'
          type='text'
        />
        <MaterialFormTextField
          title='Category'
          name='category'
          placeholder='Enter your category'
          type='text'
        />
        <MaterialFormTextField
          title='Material Type'
          name='materialType'
          placeholder='Enter your material type'
          type='text'
        />
        <MaterialFormTextField
          title='Publication Year'
          name='publicationYear'
          placeholder='Enter your publication year'
          type='date'
        />
        <MaterialFormTextField
          title='Page Count'
          name='pageCount'
          placeholder='Enter your page count'
          type='number'
        />
        <MaterialFormTextField
          title='ISBN'
          name='isbn'
          placeholder='Enter your page isbn'
          type='text'
        />
      </Form>
    </Formik>
  );
}

export default MaterialAddForm;
