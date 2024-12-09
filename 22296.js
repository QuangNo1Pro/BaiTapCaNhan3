class TemplateEngine {
  constructor (data, template) {
    this.data = data; // Dữ liệu từ database hoặc dữ liệu truyền vào
    this.template = template // Template HTML
  }

  // Hàm thay thế biến trong template
  // Hàm thay thế biến trong template
  replaceVariables () {
    this.template = this.template.replace(/{22296{([^{}]+)}}/g, (match, p1) => {
      const varName = p1.trim()

      // Log varName để kiểm tra giá trị của nó
      console.log('Variable name:', varName)

      let value = this.data[varName]

      // Log giá trị tương ứng trong data
      console.log('Value from data:', value)

      // Kiểm tra xem giá trị có phải là undefined, nếu có thì trả về chuỗi rỗng
      return value !== undefined ? value : ''
    })
  }

  // Hàm xử lý vòng lặp for
  // Hàm xử lý vòng lặp for
  processForLoops () {
    const regex = /\{22296{for (\w+) in (\w+)}\}(.*?)\{22296{\/for}\}/gs
    this.template = this.template.replace(regex, (match, loopVar, arrayName, content) => {
      const dataArray = this.data[arrayName]; // Kiểm tra lại tên mảng

      // Log để kiểm tra mảng dataArray có dữ liệu hay không
      console.log('Processing array:', arrayName, 'with data:', dataArray)

      if (Array.isArray(dataArray)) {
        return dataArray.map(item => {
          return content.replace(/\{22296{(\w+\.\w+)}\}/g, (m, path) => {
            const keys = path.split('.')
            let value = item
            for (let key of keys) {
              value = value[key] || ''; // Truy xuất giá trị
            }
            return value
          })
        }).join(''); // Nối các phần tử lại với nhau
      }
      return ''; // Nếu không phải mảng hoặc mảng rỗng, trả về chuỗi rỗng
    })
  }

  // Hàm xử lý ifelse
  processIfElse () {
    const regex = /\{22296{if (\w+)}\}(.*?)\{22296{\/if}\}/gs
    this.template = this.template.replace(regex, (match, condition, content) => {
      const value = this.data[condition]
      return value ? content : ''; // Nếu điều kiện đúng, trả lại nội dung, ngược lại trả về chuỗi rỗng
    })
  }

  // Hàm xử lý ifelse với điều kiện ngược lại (else)
  processIfElseElse () {
    const regex = /\{22296{if (\w+)}\}(.*?)\{22296{else}\}(.*?)\{22296{\/if}\}/gs
    this.template = this.template.replace(regex, (match, condition, ifContent, elseContent) => {
      const value = this.data[condition]
      return value ? ifContent : elseContent; // Trả lại nội dung nếu điều kiện đúng hoặc nếu sai
    })
  }

  // Render toàn bộ template
  render () {
    this.replaceVariables(); // Thay thế biến
    this.processForLoops(); // Xử lý vòng lặp for
    this.processIfElse(); // Xử lý ifelse
    this.processIfElseElse(); // Xử lý ifelse với else
    return this.template; // Trả về template sau khi render
  }
}

module.exports = TemplateEngine
