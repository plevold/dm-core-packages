import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Form } from '../../components/Form'
import { mockBlueprintGet, wrapper } from '../../test-utils'

describe('BooleanField', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('TextWidget', () => {
    it('should render a single boolean field', async () => {
      mockBlueprintGet([
        {
          name: 'SingleField',
          type: 'system/SIMOS/Blueprint',
          attributes: [
            {
              name: 'foo',
              type: 'system/SIMOS/BlueprintAttribute',
              attributeType: 'boolean',
            },
          ],
        },
      ])
      const { container } = render(
        <Form idReference="ds/$1" type="SingleField" />,
        { wrapper }
      )
      await waitFor(() => {
        expect(container.querySelectorAll(` input[type=checkbox]`).length).toBe(
          1
        )
        expect(screen.getByText('Foo')).toBeDefined()
      })
    })

    it('should render a string field with a label', async () => {
      mockBlueprintGet([
        {
          name: 'SingleFieldWithLabel',
          type: 'system/SIMOS/Blueprint',
          attributes: [
            {
              name: 'foo',
              type: 'system/SIMOS/BlueprintAttribute',
              attributeType: 'boolean',
              label: 'Foo',
            },
          ],
        },
      ])
      render(<Form idReference="ds/$1" type="SingleFieldWithLabel" />, {
        wrapper,
      })
      await waitFor(() => {
        expect(screen.getByText('Foo')).toBeDefined()
      })
    })

    it('should render the widget with the expected id', async () => {
      mockBlueprintGet([
        {
          name: 'SingleField',
          type: 'system/SIMOS/Blueprint',
          attributes: [
            {
              name: 'foo',
              type: 'system/SIMOS/BlueprintAttribute',
              attributeType: 'boolean',
              default: 'boo',
            },
          ],
        },
      ])
      const { container } = render(
        <Form idReference="ds/$1" type="SingleField" />,
        { wrapper }
      )
      await waitFor(() => {
        const inputNode: Element | null =
          container.querySelector(` input[name="foo"]`)
        expect(inputNode).toBeDefined()
        const id = inputNode !== null ? inputNode.getAttribute('id') : ''
        expect(id).toBe('foo')
      })
    })

    it('should fill field with data', async () => {
      mockBlueprintGet([
        {
          name: 'SingleField',
          type: 'system/SIMOS/Blueprint',
          attributes: [
            {
              name: 'foo',
              type: 'system/SIMOS/BlueprintAttribute',
              attributeType: 'string',
              default: 'boo',
            },
          ],
        },
      ])
      const formData = {
        foo: 'beep',
      }
      const { container } = render(
        <Form idReference="ds/$1" type="SingleField" formData={formData} />,
        { wrapper }
      )
      await waitFor(() => {
        const inputNode: Element | null =
          container.querySelector(` input[id="foo"]`)
        expect(inputNode).toBeDefined()
        const value = inputNode !== null ? inputNode.getAttribute('value') : ''
        expect(value).toBe(formData.foo)
      })
    })

    it('should assign a default value', async () => {
      mockBlueprintGet([
        {
          name: 'SingleField',
          type: 'system/SIMOS/Blueprint',
          attributes: [
            {
              name: 'foo',
              type: 'system/SIMOS/BlueprintAttribute',
              attributeType: 'boolean',
              default: 'True',
            },
          ],
        },
      ])
      const onSubmit = jest.fn()
      const { container } = render(
        <Form idReference="ds/$1" type="SingleField" onSubmit={onSubmit} />,
        { wrapper }
      )
      await waitFor(() => {
        const inputNode: Element | null =
          container.querySelector(` input[id="foo"]`)
        expect(inputNode).toBeDefined()
        const value = inputNode !== null ? inputNode.getAttribute('value') : ''
        expect(value).toBe('true')
        
      })
    })

    it('should handle a change event', async () => {
      mockBlueprintGet([
        {
          name: 'SingleField',
          type: 'system/SIMOS/Blueprint',
          attributes: [
            {
              name: 'foo',
              type: 'system/SIMOS/BlueprintAttribute',
              attributeType: 'boolean',
              default: 'True',
            },
          ],
        },
      ])
      const { container } = render(
        <Form idReference="ds/$1" type="SingleField" />,
        { wrapper }
      )
      await waitFor(() => {
        const inputNode: Element | null =
          container.querySelector(` input[id="foo"]`)
        expect(inputNode).toBeDefined()
        const value = inputNode !== null ? inputNode.getAttribute('value') : ''
        expect(value).toBe('true')
        userEvent.click(screen.getByTestId('form-checkbox'))
        fireEvent.click(screen.getByTestId('form-submit'))
      })
    })

    it.skip('should render a description', () => {})

    it.skip('formData should default to undefined', () => {})
  })
})
