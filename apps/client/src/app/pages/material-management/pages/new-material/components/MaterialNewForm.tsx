import { Form, Formik } from 'formik';
import MaterialFormTextField from '../../components/MaterialFormTextField';

function MaterialNewForm() {
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
          title='New Title'
          name='title'
          placeholder='Enter your Email'
          type='text'
        />
        <MaterialFormTextField
          title='New Author'
          name='author'
          placeholder='Enter your author'
          type='text'
        />
        <MaterialFormTextField
          title='New Category'
          name='category'
          placeholder='Enter your category'
          type='text'
        />
        <MaterialFormTextField
          title='Update Material Type'
          name='materialType'
          placeholder='Enter your material type'
          type='text'
        />
        <MaterialFormTextField
          title='New Publication Year'
          name='publicationYear'
          placeholder='Enter your publication year'
          type='date'
        />
        <MaterialFormTextField
          title='New Page Count'
          name='pageCount'
          placeholder='Enter your page count'
          type='number'
        />
        <MaterialFormTextField
          title='New ISBN'
          name='isbn'
          placeholder='Enter your page isbn'
          type='text'
        />
      </Form>
    </Formik>
  );
}

export default MaterialNewForm;
