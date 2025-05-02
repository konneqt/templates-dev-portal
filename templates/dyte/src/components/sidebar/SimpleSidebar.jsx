import { useEffect, useState } from 'react';
import { sidebarData } from '../../../static/sidebarData';
import styles from "./styles.module.css";

export default function SimpleSidebar() {
  const [sidebarItems, setSidebarItems] = useState([]);
  const [expandedCategories, setExpandedCategories] = useState({});

  useEffect(() => {
    if (sidebarData && Array.isArray(sidebarData)) {
      setSidebarItems(sidebarData);
      
      // Inicialize estados expandidos conforme necessário
      // Por exemplo, para expandir "Items" por padrão:
      setExpandedCategories(prev => ({
        ...prev,
        'items': true // Substitua 'items' pelo ID real do item no seu sidebarData
      }));
    } else {
      console.error('Erro ao carregar o sidebarData: Dados inválidos');
    }
  }, []);

  const toggleCategory = (categoryId) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  function renderSidebarItems(items) {
    return items.map((item, index) => {
      const itemLabel = item.label || item.id;
      const methodClass = item.method ? item.method.toLowerCase() : '';
      const isExpanded = expandedCategories[item.id];
      
      if (item.type === 'category') {
        return (
          <li key={index} className={`${styles.menuListItem} ${isExpanded ? styles.active : ''}`}>
            <div 
              className={`${styles.menuListItemCollapsible} ${isExpanded ? styles.expanded : ''}`}
              onClick={() => toggleCategory(item.id)}
            >
              <span className={`${styles.menuLink} ${styles.menuLinkSublist}`}>{itemLabel}</span>
            </div>
            {isExpanded && item.items && (
              <ul className={styles.menuList}>
                {renderSidebarItems(item.items)}
              </ul>
            )}
          </li>
        );
      }

      if (item.type === 'link') {
        return (
          <li key={index} className={`${styles.menuListItem} ${methodClass ? styles[methodClass] : ''}`}>
            <a 
              href={item.href} 
              className={`${styles.menuLink} ${item.method ? `${styles.apiMethod} ${styles[methodClass]}` : ''}`}
              data-method={item.method}
            >
              {itemLabel}
            </a>
          </li>
        );
      }

      if (item.type === 'doc') {
        // Verifique se este é um item ativo (com base em alguma lógica como URL atual)
        const isActive = false; // Substitua por sua lógica real para determinar item ativo
        
        return (
          <li key={index} className={`${styles.menuListItem} ${methodClass ? styles[methodClass] : ''}`}>
            <a 
              href={`/docs/${item.id}`} 
              className={`${styles.menuLink} ${item.method ? `${styles.apiMethod} ${styles[methodClass]}` : ''} ${isActive ? styles.menuLinkActive : ''}`}
              data-method={item.method}
            >
              {itemLabel}
            </a>
          </li>
        );
      }

      return null;
    });
  }

  return (
    <div className={styles.sidebar}>
      <nav className={`${styles.menu} ${styles.thinScrollbar}`}>
        <ul className={styles.menuList}>
          {renderSidebarItems(sidebarItems)}
        </ul>
      </nav>
      {/* Estas são variáveis CSS para cores que são usadas nos seletores */}
      <style jsx>{`
        :root {
          --ifm-color-primary: #21a1dc;
          --openapi-code-green: #4caf50;
          --openapi-code-blue: #2196f3;
          --openapi-code-orange: #ff9800;
          --openapi-code-red: #f44336;
          --ifm-color-secondary-darkest: #495057;
        }
      `}</style>
    </div>
  );
}