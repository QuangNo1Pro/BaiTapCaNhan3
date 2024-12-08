const fs = require('fs')

class TemplateEngine {
  constructor (data) {
    this.data = data; // Dữ liệu được truyền vào để điền vào template
    this.partials = this.data.partials || {}; // Partial templates nếu có
  }

  // Hàm thay thế các biến trong template
  replaceVariables (template) {
    return template.replace(/{([^{}]+)}/g, (match, p1) => {
      const varName = p1.trim()
      return this.data[varName] !== undefined ? this.data[varName] : ''; // Nếu biến không tồn tại, trả về chuỗi rỗng
    })
  }

  // Hàm xử lý câu điều kiện (if-else)
  processIfElse (template) {
    return template.replace(/{\s*if\s+([^}]+)\s*}([\s\S]*?){\s*else\s*}([\s\S]*?){\s*\/if\s*}/g, (match, condition, trueBlock, falseBlock) => {
      const conditionValue = this.evaluateCondition(condition)
      return conditionValue ? trueBlock : falseBlock
    })
  }

  // Hàm đánh giá điều kiện
  evaluateCondition (condition) {
    try {
      // Đánh giá điều kiện từ dữ liệu hiện tại, hỗ trợ các phép toán so sánh đơn giản
      return new Function('data', `with (data) { return ${condition}; }`)(this.data)
    } catch (e) {
      console.error('Condition evaluation error:', e)
      return false
    }
  }

  // Hàm xử lý vòng lặp (for)
  processForLoops (template) {
    return template.replace(/{\s*for\s+([^}]+)\s+in\s+([^}]+)\s*}([\s\S]*?){\s*\/for\s*}/g, (match, item, arrayName, content) => {
      const array = this.data[arrayName.trim()]
      if (!Array.isArray(array)) return ''; // Nếu không phải mảng, trả về chuỗi rỗng
      return array.map((element) => {
        return content.replace(/{([^{}]+)}/g, (innerMatch, p1) => {
          const prop = p1.trim()
          return element[prop] || ''; // Thay thế biến trong vòng lặp
        })
      }).join(''); // Kết hợp các phần tử trong vòng lặp
    })
  }

  // Hàm xử lý các phần template nhỏ (partials)
  processPartials (template) {
    return template.replace(/{\s*\+([^}]+)\s*}/g, (match, partialName) => {
      const partialContent = this.partials[partialName.trim()]
      if (partialContent) {
        return partialContent
      }
      console.warn(`Partial "${partialName}" not found.`)
      return ''; // Nếu không có partial, trả về chuỗi rỗng
    })
  }

  // Hàm xử lý toàn bộ template
  render (template) {
    let result = this.replaceVariables(template)
    result = this.processIfElse(result)
    result = this.processForLoops(result)
    result = this.processPartials(result)
    return result
  }
}

module.exports = TemplateEngine
